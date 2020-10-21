const getConnection = require('../connectors/mysqlConnector');

exports.getPasswordOfUser = async ({ email }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'SELECT id, password FROM users WHERE email=?',
        [email],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

exports.registerUser = async ({
  id,
  firstName,
  lastName,
  email,
  mobilePhone,
  password,
}) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'INSERT INTO users(id, first_name, last_name, email, mobile_phone, password) VALUES(?, ? , ?, ?, ?, ?)',
        [id, firstName, lastName, email, mobilePhone, password],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};
