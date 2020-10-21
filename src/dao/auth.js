const getConnection = require('../connectors/mysqlConnector');

exports.authorizeUser = async ({ email, password }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'SELECT * FROM users WHERE email=? AND password=?',
        [email, password],
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

exports.setRefreshToken = async ({ email, refreshToken }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'INSERT INTO auth (email,refresh_token) values(?, ?)',
        [email, refreshToken],
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

exports.getRefreshToken = async ({ refreshToken }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'SELECT * FROM auth where refresh_token = ?',
        [refreshToken],
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

exports.deleteRefreshToken = async ({ refreshToken }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'DELETE FROM auth where refresh_token = ?',
        [refreshToken],
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
