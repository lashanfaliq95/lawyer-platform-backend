const getConnection = require('../connectors/mysqlConnector');

exports.setRefreshToken = async ({ id, refreshToken }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'INSERT INTO auth (id,refresh_token) values(?, ?)',
        [id, refreshToken],
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
