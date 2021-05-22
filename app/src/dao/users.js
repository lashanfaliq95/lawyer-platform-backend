const { QueryTypes /**Op */ } = require('sequelize');

const sequelize = require('../connectors/database');
const { User, UserMessages } = require('../models/index');

exports.getPasswordOfUser = ({ email, roleId }) => {
  return User.findAll({
    attributes: ['id', 'password'],
    where: { email, roleId },
  });
};

exports.getPasswordOfUserFromId = ({ id }) => {
  return User.findAll({
    attributes: ['password'],
    where: { id },
  });
};

exports.getUserIdFromEmail = ({ email }) => {
  return User.findAll({ attributes: ['id'], where: { email } });
};

exports.getIdOfUser = ({ email }) => {
  return User.findAll({ attributes: ['id'], where: { email } });
};

exports.registerUser = ({
  id,
  firstName,
  lastName,
  email,
  mobilePhone,
  password,
}) => {
  return User.create({
    id,
    firstName,
    lastName,
    email,
    mobilePhone,
    password,
    roleId: 1,
  });
};

exports.registerLawyer = ({
  id,
  firstName,
  lastName,
  email,
  mobilePhone,
  password,
  expertType,
  road,
  houseNumber,
  city,
  zipCode,
  gender,
}) => {
  return User.create({
    id,
    email,
    password,
    road,
    city,
    firstName,
    lastName,
    mobilePhone,
    roleId: 2,
    expertId: expertType,
    houseNumber,
    zipCode,
    gender,
  });
};

exports.getLawyer = (id) => {
  return sequelize.query(
    'SELECT DISTINCT id, CONCAT(firstName, " ", lastName ) as name, email, mobilePhone, road, houseNumber, zipCode, city, firm, imageUrl as imgUrl, fax, gender, latitude, longitude, specializationIds, languageIds FROM users' +
      ' left join (select userId, group_concat(specialization_id) as specializationIds from user_specializations group by userId) a on users.id=a.userId' +
      ' left join (select userId, group_concat(languageId) as languageIds from user_languages group by userId) b on users.id=b.userId' +
      ' WHERE roleId=? AND users.id=?',
    { replacements: [2, id], type: QueryTypes.SELECT }
  );
};

exports.getLawyers = () => {
  return User.findAll({
    attributes: [
      'id',
      [sequelize.fn('CONCAT', col('firstName'), ' ', col('lastName')), 'name'],
      'email',
      'road',
      'houseNumber',
      'city',
      'zipCode',
      'firm',
      ['imageUrl', 'imgUrl'],
      'mobilePhone',
      'latitude',
      'longitude',
    ],
    where: { roleId: 2 },
  });
};

exports.getLawyerAvailability = ({ id, startDate }) => {
  // Same as below raw query, but not sure if dates are correct

  // return LawyerAvailability.findAll({
  //   attributes: [
  //     ['laweyerId', 'id'],
  //     ['time_slot', 'timeSlot'],
  //     ['dayOfWeek', 'dayOfWeek'],
  //     'date',
  //   ],
  //   where: {
  //     available: true,
  //     laweyerId: id,
  //     date: {
  //       [Op.gt]: startDate,
  //       [Op.lte]: new Date(
  //         new Date(startDate).getTime() + 5 * 24 * 60 * 60 * 1000
  //       ),
  //     },
  //   },
  // });

  return sequelize.query(
    'SELECT laweyerId AS id, time_slot AS timeSlot, date, dayOfWeek as dayOfWeek ' +
      'FROM lawyer_availability WHERE available = true AND laweyerId = ? AND ' +
      'date > ? AND date <= DATE_ADD(?, INTERVAL 5 DAY)',
    { replacements: [id, startDate, startDate], type: QueryTypes.SELECT }
  );

  // keeping for reference to check if above raw query is correct, must be deleted before merging to master branch

  // return await new Promise((resolve, reject) => {
  //   return getConnection(async (connection) => {
  //     connection.query(
  //       'SELECT laweyerId AS id, time_slot AS timeSlot, date, dayOfWeek as dayOfWeek FROM lawyer_availability WHERE available=true AND laweyerId=? AND date > ? AND date <= DATE_ADD(?,INTERVAL 5 DAY)',
  //       [id, startDate, startDate],
  //       (error, result) => {
  //         if (error) {
  //           reject(error);
  //         }
  //         resolve(result);
  //       }
  //     );
  //   });
  // });
};

exports.saveUserPassword = (id, password) => {
  return User.update({ password }, { where: { id } });
};

exports.getUserAppointments = ({ id, password }) => {
  return User.update({ password }, { where: { id } });
};

exports.getLawyerAppointments = ({ id, password }) => {
  return User.update({ password }, { where: { id } });
};

exports.deleteUser = async (id) => {
  return User.destroy({ where: { id } });
};

exports.updatePassword = async (id) => {
  return User.destroy({ where: { id } });
};

exports.updateUser = async ({
  id,
  firstName,
  lastName,
  email,
  phoneNumber,
}) => {
  return User.update(
    {
      firstName,
      lastName,
      email,
      mobilePhone: phoneNumber,
    },
    { where: { id } }
  );
};

exports.userAccountVerified = ({ id }) => {
  return User.update(
    {
      isAccountConfirmed: 1,
    },
    { where: { id } }
  );
};

exports.saveUserMessage = ({ id, message }) => {
  return UserMessages.create({
    userId: id,
    message,
  });
};
