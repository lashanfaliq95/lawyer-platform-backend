const getConnection = require('../connectors/mysqlConnector');

exports.setRefreshToken = async ({ refreshToken }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'INSERT INTO auth (refresh_token) values(?)',
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


exports.getResetTokenExpiration = async ({ token }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'SELECT id, reset_token_expiration FROM users where reset_token = ?',
        [token],
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
