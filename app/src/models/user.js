const { STRING, INTEGER, DECIMAL } = require('sequelize');

const sequelize = require('../connectors/database');
const Role = require('./role');

const Users = sequelize.define(
  'users',
  {
    id: {
      type: STRING,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: STRING,
      allowNull: false,
    },
    last_name: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    mobile_phone: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    fax: STRING,
    road: STRING,
    house_number: STRING,
    city: STRING,
    zip_code: STRING,
    firm: STRING,
    gender: STRING,
    image_url: STRING,
    reset_token: STRING,
    reset_token_expiration: STRING,
    longitude: DECIMAL(9, 6),
    latitude: DECIMAL(8, 6),
    country: STRING,
    expert_type: STRING,
  },
  { timestamps: false }
);

Users.belongsTo(Role, { targetKey: 'id', foreignKey: 'role_id' });

module.exports = Users;
