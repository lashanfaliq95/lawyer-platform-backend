const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');
const User = require('./user');

const userMessages = sequelize.define(
  'user_messages',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

userMessages.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = userMessages;
