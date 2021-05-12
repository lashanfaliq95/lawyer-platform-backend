const userDao = require('../dao/users');
const authUtil = require('../utils/auth');
const dateUtil = require('../utils/date');
const userUtil = require('../utils/user');
const { appointments } = require('../mocks');

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
      const userIds = await userDao.getUserIdFromEmail({ email });
      if (userIds && userIds.length === 0) {
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
      } else {
        res.status(400).json({ message: 'User already exists' });
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

exports.getLawyer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userDao.getLawyer(id);
    if (result) {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong.' });
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
        res.status(200).send(userUtil.formatResponse(id, result, startDate));
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
  const { id } = req.params;
  if (id) {
    try {
      const result = await userDao.deleteUser(id);
      if (result) {
        res.status(200).send({ message: 'User deleted successfully' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong.' });
    }
  } else {
    res.status(400).json({ message: 'Invalid parameters' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber } = req.body;
  if (id && firstName && lastName && email && phoneNumber) {
    try {
      const result = await userDao.updateUser({
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
      });
      if (result) {
        res.status(200).send({ data: result });
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: 'Something went wrong.' });
    }
  } else {
    res.status(400).json({ message: 'Invalid parameters' });
  }
};

exports.updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  if (id && currentPassword && newPassword) {
    try {
      let result = await userDao.getPasswordOfUserFromId(id);
      if (result && result.length !== 0) {
        const isUserAuthenticated = await authUtil.comparePassword(
          currentPassword,
          result[0].password
        );
        if (isUserAuthenticated) {
          const encryptedPassword = await authUtil.encryptPassword(newPassword);
          result = await userDao.saveUserPassword(id, encryptedPassword);
          if (result) {
            res
              .status(200)
              .send({ message: 'Successfully updated user password' });
          }
        } else {
          res.status(400).json({
            error: 'Current password incorrect',
          });
        }
      } else {
        res.status(500).send({ message: 'Something went wrong.' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Something went wrong.' });
    }
  } else {
    res.status(400).json({ message: 'Invalid parameters' });
  }
};

exports.getUserAppointments = async (req, res) => {
  const { id } = req.params;
  const { status } = req.query;
  if (id) {
    try {
      // TODO - Implement once the appointment structure is finalized
      // status 0 for active appointments, 1 for completed or past
      // const result = await userDao.getUserAppointments();
      let result;
      if (status === '0') {
        result = appointments;
      } else {
        result = appointments.slice(0, 5);
      }
      if (result) {
        res.status(200).send({ data: result });
      }
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong.' });
    }
  } else {
    res.status(400).json({ message: 'Invalid parameters' });
  }
};

exports.getLawyerAppointments = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      // TODO - Implement once the appointment structure is finalized
      // status 0 for active appointments, 1 for completed or past
      // const result = await userDao.getUsers();
      const result = appointments.slice(0, 5);
      if (result) {
        res.status(200).send({ data: result });
      }
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong.' });
    }
  } else {
    res.status(400).json({ message: 'Invalid parameters' });
  }
};
