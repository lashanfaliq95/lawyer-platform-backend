const authDao = require('../dao/users');
const userUtil = require('../utils/auth');

exports.register = async (req, res) => {
  const { firstName, lastName, mobilePhone, email, password } = req.body;
  if (firstName && lastName && mobilePhone && email && password) {
    try {
      const id = userUtil.createUserId();
      const encryptedPassword = await userUtil.encryptPassword(password);
      const result = await authDao.registerUser({
        id,
        firstName,
        lastName,
        mobilePhone,
        email,
        password: encryptedPassword,
      });

      if (result) {
        const userResponse = {
          id: id,
          email: email,
        };
        res.status(200).send({ data: userResponse });
      }
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong.' });
    }
  } else {
    res.status(400).json({ message: 'Invalid parameters' });
  }
};
