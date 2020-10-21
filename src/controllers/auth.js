const jwt = require('jsonwebtoken');

const authDao = require('../dao/auth');
const userDao = require('../dao/users');
const authUtil = require('../utils/auth');

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

          await authDao.setRefreshToken({ id: user.id, refreshToken });
          res.status(200).json({
            accessToken,
            refreshToken,
          });
        } else {
          res.status(401).json({
            message: 'User name or password did not match.',
          });
        }
      } else {
        res.status(500).json({ message: 'Some thing went wrong' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Some thing went wrong' });
    }
  } else {
    res.status(401).json({ message: 'User name or password not defined.' });
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

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await authDao.deleteRefreshToken({ refreshToken });
    res.send('Logout successful');
  } catch (error) {
    res.status(500).send({ error });
  }
};
