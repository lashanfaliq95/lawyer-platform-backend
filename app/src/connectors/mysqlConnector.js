const mysql = require('mysql');

if (process.env.NODE_ENV !== 'prod') {
  require('dotenv').config();
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

const getConnection = async (actionAsync) => {
  const connection = await new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        resolve(connection);
      }
    });
  });
  try {
    return await actionAsync(connection);
  } finally {
    connection.release();
  }
};

module.exports = getConnection;
