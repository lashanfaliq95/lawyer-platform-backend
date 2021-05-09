const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const UserLanguages = sequelize.define('user_languages', {
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  languageId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = UserLanguages;
