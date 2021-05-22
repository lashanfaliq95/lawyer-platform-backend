const { STRING, INTEGER, DECIMAL, BOOLEAN } = require('sequelize');

const sequelize = require('../connectors/database');
const Role = require('./role');
const ExpertTypes = require('./expertTypes');

const Users = sequelize.define(
  'users',
  {
    id: {
      type: STRING,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: STRING,
      allowNull: false,
    },
    lastName: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    mobilePhone: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    fax: STRING,
    road: STRING,
    houseNumber: STRING,
    city: STRING,
    zipCode: STRING,
    firm: STRING,
    gender: STRING,
    imageUrl: STRING,
    longitude: DECIMAL(9, 6),
    latitude: DECIMAL(8, 6),
    expertId: INTEGER,
    isAccountConfirmed: {
      type: BOOLEAN,
      defaultValue: 0,
    },
  },
  { timestamps: false }
);

Users.belongsTo(Role, { targetKey: 'id', foreignKey: 'roleId' });
Users.belongsTo(ExpertTypes, { targetKey: 'id', foreignKey: 'expertId' });
module.exports = Users;
