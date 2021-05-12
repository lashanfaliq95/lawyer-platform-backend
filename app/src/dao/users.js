const { QueryTypes /**Op */ } = require('sequelize');

const sequelize = require('../connectors/database');
const { User /**LawyerAvailability */ } = require('../models/index');

exports.getPasswordOfUser = ({ email }) => {
  return User.findAll({
    attributes: ['id', 'password', ['role_id', 'roleId']],
    where: { email },
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
  roleId,
}) => {
  return User.create({
    id,
    first_name: firstName,
    last_name: lastName,
    email,
    mobile_phone: mobilePhone,
    password,
    role_id: roleId,
    gender: 0,
  });
};

exports.getLawyer = (id) => {
  return sequelize.query(
    'SELECT DISTINCT id, CONCAT(first_name, " ", last_name ) as name,email, address, firm, image_url as imgUrl, mobile_phone as mobilePhone, fax, gender, latitude, longitude, specializationIds, languageIds FROM users' +
      ' left join (select user_id, group_concat(specialization_id) as specializationIds from user_specializations group by user_id) a on users.id=a.user_id' +
      ' left join (select user_id, group_concat(language_id) as languageIds from user_languages group by user_id) b on users.id=b.user_id' +
      ' WHERE role_id=? AND users.id=?',
    { replacements: [2, id], type: QueryTypes.SELECT }
  );

  // return await new Promise((resolve, reject) => {
  //   return getConnection(async (connection) => {
  //     connection.query(
  //       "SELECT DISTINCT id, CONCAT(first_name,' ', last_name ) as name,email, address, firm, image_url as imgUrl, mobile_phone as mobilePhone, fax, gender, latitude, longitude, specializationIds, languageIds FROM users" +
  //         ' left join (select user_id, group_concat(specialization_id) as specializationIds from user_specializations group by user_id) a on users.id=a.user_id' +
  //         ' left join (select user_id, group_concat(language_id) as languageIds from user_languages group by user_id) b on users.id=b.user_id' +
  //         ' WHERE role_id=2 AND users.id=?',
  //       [id],
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

exports.getLawyers = () => {
  return User.findAll({
    attributes: [
      'id',
      [
        sequelize.fn('CONCAT', col('first_name'), ' ', col('last_name')),
        'name',
      ],
      'email',
      'address',
      'firm',
      ['image_url', 'imgUrl'],
      ['mobile_phone', 'mobilePhone'],
      'latitude',
      'longitude',
    ],
    where: { role_id: 2 },
  });
};

exports.getLawyerAvailability = ({ id, startDate }) => {
  // Same as below raw query, but not sure if dates are correct

  // return LawyerAvailability.findAll({
  //   attributes: [
  //     ['lawyer_id', 'id'],
  //     ['time_slot', 'timeSlot'],
  //     ['day_of_week', 'dayOfWeek'],
  //     'date',
  //   ],
  //   where: {
  //     available: true,
  //     lawyer_id: id,
  //     date: {
  //       [Op.gt]: startDate,
  //       [Op.lte]: new Date(
  //         new Date(startDate).getTime() + 5 * 24 * 60 * 60 * 1000
  //       ),
  //     },
  //   },
  // });

  return sequelize.query(
    'SELECT lawyer_id AS id, time_slot AS timeSlot, date, day_of_week as dayOfWeek ' +
      'FROM lawyer_availability WHERE available = true AND lawyer_id = ? AND ' +
      'date > ? AND date <= DATE_ADD(?, INTERVAL 5 DAY)',
    { replacements: [id, startDate, startDate], type: QueryTypes.SELECT }
  );

  // keeping for reference to check if above raw query is correct, must be deleted before merging to master branch

  // return await new Promise((resolve, reject) => {
  //   return getConnection(async (connection) => {
  //     connection.query(
  //       'SELECT lawyer_id AS id, time_slot AS timeSlot, date, day_of_week as dayOfWeek FROM lawyer_availability WHERE available=true AND lawyer_id=? AND date > ? AND date <= DATE_ADD(?,INTERVAL 5 DAY)',
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

exports.saveUserPassword = ({ id, password }) => {
  return User.update({ password }, { where: { id } });
};

exports.savePasswordResetToken = ({ id, resetToken, expirationTimeString }) => {
  return User.update(
    { reset_token: resetToken, reset_token_expiration: expirationTimeString },
    { where: { id } }
  );
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
      first_name: firstName,
      last_name: lastName,
      email,
      mobile_phone: phoneNumber,
    },
    { where: { id } }
  );
};
