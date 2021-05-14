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
  const { email, password } = req.body;
  if (email && password) {
    try {
      const result = await userDao.getPasswordOfUser({ email });
      if (result && result.length !== 0) {
        const user = result[0];

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
          res.status(200).json({
            accessToken,
            refreshToken,
            id: user.id,
            roleId: user.roleId,
          });
        } else {
          res.status(400).json({
            error: 'User name or password did not match.',
          });
        }
      } else {
        res
          .status(400)
          .json({ message: 'User name or password did not match.' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Some thing went wrong' });
    }
  } else {
    res.status(400).json({ message: 'User name or password not defined.' });
  }
};

exports.token = async (req, res) => {
  try {
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

      res.status(200).json({
        accessToken,
      });
    });
  } catch (error) {
    res.status(500).send({ error });
  }
};

exports.forgot = async (req, res) => {
  const { email } = req.body;
  if (email) {
    try {
      const result = await userDao.getIdOfUser({ email });
      if (result && result.length > 0) {
        const { id } = result[0];
        const resetToken = await authUtil.createToken();
        const expirationTimeString = dateUtil.timestampInComingHours();

        await userDao.savePasswordResetToken({
          id,
          resetToken,
          expirationTimeString,
        });

        const emailResult = await sendResetPasswordEmail(email, {
          resetToken,
        });
        res.status(200).json({ data: emailResult });
      } else {
        res.status(400).json({ message: 'Email not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  } else {
    res.status(400).json({ message: 'User name or password not defined.' });
  }
};

exports.resetUserPassword = async (req, res) => {
  try {
    const { id, password, email } = req.body;
    if (id && password) {
      const encryptedPassword = await authUtil.encryptPassword(password);
      await userDao.saveUserPassword({
        id,
        password: encryptedPassword,
      });
      // await emailHelper.sendPasswordResetSuccessEmail({
      //   to: email,
      // });

      res.status(200).json({ message: 'Password Reset success' });
    } else {
      res.status(400).json({ message: 'Invalid parameters' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Password Reset failure' });
  }
};

exports.getResetToken = async (req, res) => {
  try {
    const { token } = req.params;
    const result = await authDao.getResetTokenExpiration({ token });
    if (result && result.length > 0) {
      const { id, reset_token_expiration, email } = result[0];
      if (dateUtil.hasTimestampExpired(reset_token_expiration)) {
        res.status(200).json({ id, email });
      } else {
        res.status(400).json({ message: 'Reset token has expired' });
      }
    } else {
      res.status(400).json({ message: 'Token not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await authDao.deleteRefreshToken({ refreshToken });
    res.status(200).send('Logout successful');
  } catch (error) {
    res.status(500).send({ error });
  }
};
