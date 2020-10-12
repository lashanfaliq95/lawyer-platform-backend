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
