const getConnection = require('../connectors/mysqlConnector');

(async () => {
    return await new Promise((resolve, reject) => {
      return getConnection(async (connection) => {
        connection.query(
          'SELECT * FROM users',
          (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result);
          }
        );
      });
    });
})();

