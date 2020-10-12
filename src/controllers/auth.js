const jwt = require('jsonwebtoken');
const authDao = require('../dao/auth');

if (process.env.NODE_ENV !== 'prod') {
  require('dotenv').config();
}

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  if (userName && password) {
    try {
      const result = await authDao.authorizeUser({
        userName,
        password,
      });
      if (result && result.length !== 0) {
        const user = result[0];

        const accessToken = jwt.sign(
          { username: user.user_name },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '20m' }
        );
        const refreshToken = jwt.sign(
          { username: user.username, role: user.role },
          process.env.REFRESH_TOKEN_SECRET
        );

        await authDao.setRefreshToken({ userName, refreshToken });

        res.status(200).json({
          accessToken,
          refreshToken,
        });
      } else {
        res
          .status(401)
          .json({ message: 'User name or password did not match.' });
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  } else {
    res.status(401).json({ message: 'User name or password not defined.' });
  }
};

exports.token = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  try {
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
        { username: result[0].user_name },
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
  const { refreshToken } = req.body;
  try {
    await authDao.deleteRefreshToken({ refreshToken });
    res.send('Logout successful');
  } catch (error) {
    res.status(500).send({ error });
  }
};
