const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');
const User = require('./user');

const UserMessages = sequelize.define(
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

UserMessages.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = UserMessages;
