const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const User = sequelize.define('users', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mobilePhone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fax: Sequelize.STRING,
  address: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firm: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: Sequelize.INTEGER,
  imageUrl: Sequelize.STRING,
  resetToken: Sequelize.STRING,
  resetTokenExpiration: Sequelize.STRING,
  longitude: Sequelize.DECIMAL(9, 6),
  latitude: Sequelize.DECIMAL(8, 6),
  country: Sequelize.STRING,
  zipCode: Sequelize.INTEGER,
});

module.exports = User;
