const userDao = require('../dao/users');
const authUtil = require('../utils/auth');
const dateUtil = require('../utils/date');
const userUtil = require('../utils/user');

exports.createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    mobilePhone,
    email,
    password,
    roleId,
  } = req.body;
  if ((firstName && lastName && mobilePhone && email && password, roleId)) {
    try {
      const id = authUtil.createUserId();
      const encryptedPassword = await authUtil.encryptPassword(password);
      const result = await userDao.registerUser({
        id,
        firstName,
        lastName,
        mobilePhone,
        email,
        roleId,
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

exports.getUser = async (req, res) => {
  const { id } = req.body;
  if (id) {
    try {
      const result = await userDao.getUsers();
      if (result) {
        res.status(200).send({ data: userResponse });
      }
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong.' });
    }
  } else {
    res.status(400).json({ message: 'Invalid parameters' });
  }
};

exports.getLawyers = async (req, res) => {
  try {
    const result = await userDao.getLawyers();
    if (result) {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong.' });
  }
};

exports.getLawyerAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate } = req.query;
    if (id) {
      const result = await userDao.getLawyerAvailability({
        id,
        startDate: dateUtil.getMySqlDate(startDate),
      });
      if (result && result.length > 0) {
        res.status(200).send(userUtil.formatResponse(id, result));
      } else {
        res.status(200).send(result);
      }
    } else {
      res.status(400).json({ message: 'Invalid parameters' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Something went wrong.' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.body;
  if (id) {
    try {
      const result = await userDao.deleteUser({ id });
      if (result) {
        res.status(200).send({ data: userResponse });
      }
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong.' });
    }
  } else {
    res.status(400).json({ message: 'Invalid parameters' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.body;
  if (id) {
    try {
      const result = await userDao.deleteUser({ id });
      if (result) {
        res.status(200).send({ data: userResponse });
      }
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong.' });
    }
  } else {
    res.status(400).json({ message: 'Invalid parameters' });
  }
};
