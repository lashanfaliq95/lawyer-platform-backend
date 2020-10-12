const jwt = require('jsonwebtoken');
const authDao = require('../dao/auth');

if (process.env.NODE_ENV !== 'prod') {
  require('dotenv').config();
}

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  if (userName && password) {
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

      res.status(200).json({
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).send({ message: 'User name or password did not match.' });
    }

    // filter user from the users array by username and password
    // const user = users.find(u => { return u.username === username && u.password === password });

    // if (user) {
    //     // generate an access token
    //     const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });
    //     const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

    //     refreshTokens.push(refreshToken);

    //     res.json({
    //         accessToken,
    //         refreshToken
    //     });
    // } else {
    //     res.send('Username or password incorrect');
    // }
  } else {
    res.status(401).send({ message: 'User name or password not defined.' });
  }
};
