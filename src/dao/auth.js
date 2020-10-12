const getConnection = require('../connectors/mysqlConnector');

exports.authorizeUser = async ({ userName, password }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'SELECT * FROM users WHERE user_name=? AND password=?',
        [userName, password],
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

exports.setRefreshToken = async ({ userName, refreshToken }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'INSERT INTO auth (user_name,refresh_token) values(?, ?)',
        [userName, refreshToken],
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
