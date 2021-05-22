const { INTEGER, STRING, literal } = require('sequelize');

const sequelize = require('../connectors/database');
const User = require('./user');

const ConfirmationToken = sequelize.define(
  'confirmation_tokens',
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: STRING,
      allowNull: false,
    },
    userId: {
      type: STRING,
      allowNull: false,
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  },
  { timestamps: false }
);

ConfirmationToken.belongsTo(User, { targetKey: 'id', foreignKey: 'userId' });

module.exports = ConfirmationToken;
