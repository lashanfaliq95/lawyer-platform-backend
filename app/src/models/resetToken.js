const { INTEGER, STRING, literal } = require('sequelize');

const sequelize = require('../connectors/database');
const User = require('./user');

const ResetToken = sequelize.define(
  'reset_token',
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
    user_id: {
      type: STRING,
      allowNull: false,
    },
    created_at: {
      type: 'TIMESTAMP',
      defaultValue: literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  },
  { timestamps: false }
);

ResetToken.belongsTo(User, { targetKey: 'id', foreignKey: 'user_id' });

module.exports = ResetToken;
