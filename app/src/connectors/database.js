const Sequelize = require('sequelize');

if (process.env.NODE_ENV !== 'prod') {
  require('dotenv').config();
}

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    dialectOptions: { decimalNumbers: true },
  }
);

module.exports = sequelize;
