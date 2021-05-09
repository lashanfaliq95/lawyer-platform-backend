const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const UserSpecialization = sequelize.define('user_specializations', {
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  specializationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = UserSpecialization;
