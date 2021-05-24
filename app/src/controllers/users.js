const userDao = require('../dao/users');
const authDao = require('../dao/auth');
const authUtil = require('../utils/auth');
const dateUtil = require('../utils/date');
const userUtil = require('../utils/user');
const { sendConfirmAccountEmail } = require('../helper/emailHelper');
const { appointments } = require('../mocks');

exports.createUser = async (req, res) => {
  const { firstName, lastName, mobilePhone, email, password } = req.body;
  if (firstName && lastName && mobilePhone && email && password) {
    const userIds = await userDao.getUserIdFromEmail({ email });
    if (userIds && userIds.length === 0) {
      const id = authUtil.createUserId();
      const encryptedPassword = await authUtil.encryptPassword(password);
      await userDao.registerUser({
        id,
        firstName,
        lastName,
        mobilePhone,
        email,
        password: encryptedPassword,
      });

      return res.status(200).send({
        data: {
          id: id,
          email: email,
        },
      });
    }
    return res.status(400).json({ message: 'User already exists' });
  }
  return res.status(400).json({ message: 'Invalid parameters' });
};

exports.createLawyer = async (req, res) => {
  const {
    firstName,
    lastName,
    telephoneNumber: mobilePhone,
    email,
    password,
    jobTitle: expertType,
    road,
    houseNumber,
    city,
    zipCode,
    gender,
    tutorial,
    selectedDateTime,
  } = req.body;
  if (firstName && lastName && mobilePhone && email && password) {
    const userIds = await userDao.getUserIdFromEmail({ email });
    if (userIds && userIds.length === 0) {
      const id = authUtil.createUserId();
      const confirmationToken = await authUtil.createToken();
      const encryptedPassword = await authUtil.encryptPassword(password);

      await userDao.registerLawyer({
        id,
        firstName,
        lastName,
        mobilePhone,
        email,
        expertType,
        road,
        houseNumber,
        city,
        zipCode,
        gender,
        password: encryptedPassword,
      });

      await authDao.saveAccountConfirmationToken({ id, confirmationToken });

      await sendConfirmAccountEmail(email, {
        token: confirmationToken,
      });

      const userResponse = {
        id: id,
        email: email,
      };
      return res.status(200).send({ data: userResponse });
    }
    return res.status(400).json({ message: 'User already exists' });
  }
  return res.status(400).json({ message: 'Invalid parameters' });
};

exports.getLawyer = async (req, res) => {
  const { id } = req.params;
  const result = await userDao.getLawyer(id);
  return res.status(200).send(result);
};

exports.getLawyers = async (req, res) => {
  const result = await userDao.getLawyers();
  return res.status(200).send(result);
};

exports.getLawyerAvailability = async (req, res) => {
  const { id } = req.params;
  const { startDate } = req.query;
  if (id) {
    // const result = await userDao.getLawyerAvailability({
    //   id,
    //   startDate: dateUtil.getMySqlDate(startDate),
    // });
    // if (result && udresult.length > 0) {
    //   res.status(200).send(userUtil.formatResponse(id, result, startDate));
    // } else {
    //   res.status(200).send(result);
    // }
    return res.status(501).json({ message: 'not implemented' });
  }
  return res.status(400).json({ message: 'Invalid parameters' });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (id) {
    await userDao.deleteUser(id);
    return res.status(200).send({ message: 'User deleted successfully' });
  }
  return res.status(400).json({ message: 'Invalid parameters' });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber } = req.body;
  if (id && firstName && lastName && email && phoneNumber) {
    const result = await userDao.updateUser({
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    return res.status(200).send({ data: result });
  }
  return res.status(400).json({ message: 'Invalid parameters' });
};

exports.updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  if (id && currentPassword && newPassword) {
    let result = await userDao.getPasswordOfUserFromId({ id });
    if (result && result.length !== 0) {
      const isUserAuthenticated = await authUtil.comparePassword(
        currentPassword,
        result[0].password
      );
      if (isUserAuthenticated) {
        const encryptedPassword = await authUtil.encryptPassword(newPassword);
        await userDao.saveUserPassword(id, encryptedPassword);
        return res
          .status(200)
          .send({ message: 'Successfully updated user password' });
      }
      return res.status(400).json({
        error: 'Current password incorrect',
      });
    }
    return res.status(500).send({ message: 'Something went wrong.' });
  }
  return res.status(400).json({ message: 'Invalid parameters' });
};

exports.getUserAppointments = async (req, res) => {
  const { id } = req.params;
  const { status } = req.query;
  if (id) {
    // TODO - Implement once the appointment structure is finalized
    // status 0 for active appointments, 1 for completed or past
    // const result = await userDao.getUserAppointments();
    let result;
    if (status === '0') {
      result = appointments;
    } else {
      result = appointments.slice(0, 5);
    }

    return res.status(200).send({ data: result });
  }
  return res.status(400).json({ message: 'Invalid parameters' });
};

exports.getLawyerAppointments = async (req, res) => {
  const { id } = req.params;
  if (id) {
    // TODO - Implement once the appointment structure is finalized
    // status 0 for active appointments, 1 for completed or past
    // const result = await userDao.getUsers();
    const result = appointments.slice(0, 5);

    return res.status(200).send({ data: result });
  }
  return res.status(400).json({ message: 'Invalid parameters' });
};

exports.createUserMessage = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  if (id && message) {
    await userDao.saveUserMessage({ id, message });
    return res
      .status(200)
      .send({ message: 'Successfully updated user password' });
  }
  return res.status(400).json({ message: 'Invalid parameters' });
};
