const jwt = require('jsonwebtoken');

const authDao = require('../dao/auth');
const userDao = require('../dao/users');

const authUtil = require('../utils/auth');
const dateUtil = require('../utils/date');

const { sendResetPasswordEmail } = require('../helper/emailHelper');

if (process.env.NODE_ENV !== 'prod') {
  require('dotenv').config();
}

exports.login = async (req, res) => {
  const { email, password, roleId } = req.body;
  if (email && password && roleId) {
    const result = await userDao.getPasswordOfUser({
      email,
      roleId,
    });

    if (result && result.length !== 0) {
      const user = result[0];
      if (roleId === 2 && !user.isAccountConfirmed) {
        return res.status(400).json({
          error: 'Account has not been confirmed yet',
        });
      }
      const isUserAuthenticated = await authUtil.comparePassword(
        password,
        user.password
      );

      if (isUserAuthenticated) {
        const accessToken = jwt.sign(
          { id: user.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '20m' }
        );
        const refreshToken = jwt.sign(
          { id: user.id },
          process.env.REFRESH_TOKEN_SECRET
        );

        await authDao.setRefreshToken({ refreshToken });
        return res.status(200).json({
          id: user.id,
          accessToken,
          refreshToken,
          roleId,
        });
      }
    }
    return res
      .status(400)
      .json({ message: 'User name or password did not match.' });
  }
  return res
    .status(400)
    .json({ message: 'User name or password not defined.' });
};

exports.token = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }
  const result = await authDao.getRefreshToken({ refreshToken });
  const isRefreshTokenValid = result && result[0];

  if (!isRefreshTokenValid) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      { email: result[0].email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '20m' }
    );

    return res.status(200).json({
      accessToken,
    });
  });
};

exports.forgot = async (req, res) => {
  const { email } = req.body;
  if (email) {
    const result = await userDao.getIdOfUser({ email });
    if (result && result.length > 0) {
      const { id } = result[0];
      const resetToken = await authUtil.createToken();

      await authDao.savePasswordResetToken({
        id,
        resetToken,
      });

      const emailResult = await sendResetPasswordEmail(email, {
        token: resetToken,
      });
      return res.status(200).json({ data: emailResult });
    }
    return res.status(400).json({ message: 'Email not found' });
  }
  return res
    .status(400)
    .json({ message: 'User name or password not defined.' });
};

exports.resetUserPassword = async (req, res) => {
  const { id, password, email } = req.body;
  if (id && password) {
    const encryptedPassword = await authUtil.encryptPassword(password);
    await userDao.saveUserPassword(id, encryptedPassword);
    // await emailHelper.sendPasswordResetSuccessEmail({
    //   to: email,
    // });

    return res.status(200).json({ message: 'Password Reset success' });
  }
  return res.status(400).json({ message: 'Invalid parameters' });
};

exports.getResetToken = async (req, res) => {
  const { token } = req.params;
  const result = await authDao.getResetTokenExpiration({ token });
  if (result && result.length > 0) {
    const { userId: id, createdAt } = result[0].dataValues;
    if (!dateUtil.hasTimestampExpired(createdAt)) {
      return res.status(200).json({ id });
    }
    return res.status(400).json({ message: 'Reset token has expired' });
  }
  return res.status(400).json({ message: 'Token not found' });
};

exports.getConfirmationToken = async (req, res) => {
  const { token } = req.body;
  const result = await authDao.getConfirmationTokenExpiration({ token });
  if (result && result.length > 0) {
    const { userId: id, createdAt } = result[0].dataValues;
    if (!dateUtil.hasTimestampExpired(createdAt)) {
      await userDao.userAccountVerified({ id });
      return res.status(200).json({ isConfirmationTokenValid: true });
    }
    return res.status(400).json({ message: 'confirmation token has expired' });
  }
  return res.status(400).json({ message: 'Token not found' });
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  await authDao.deleteRefreshToken({ refreshToken });
  return res.status(200).send('Logout successful');
};
