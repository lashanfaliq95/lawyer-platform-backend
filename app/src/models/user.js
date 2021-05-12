const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');
const Role = require('./role');
const ExpertType = require('./expertType');

const User = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mobile_phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fax: Sequelize.STRING,
    address: Sequelize.STRING,
    firm: Sequelize.STRING,
    gender: Sequelize.INTEGER,
    image_url: Sequelize.STRING,
    reset_token: Sequelize.STRING,
    reset_token_expiration: Sequelize.STRING,
    longitude: Sequelize.DECIMAL(9, 6),
    latitude: Sequelize.DECIMAL(8, 6),
    country: Sequelize.STRING,
    zip_code: Sequelize.INTEGER,
  },
  { timestamps: false }
);

User.belongsTo(Role, { targetKey: 'id', foreignKey: 'role_id' });
User.belongsTo(ExpertType, { targetKey: 'id', foreignKey: 'expert_type_id' });

module.exports = User;
