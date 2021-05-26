const sequelize = require('../connectors/database');
const User = require('./user');
const Specialization = require('./specialization');

const UserSpecialization = sequelize.define(
  'user_specializations',
  {},
  {
    timestamps: false,
  }
);

User.belongsToMany(Specialization, {
  through: UserSpecialization,
  foreignKey: 'userId',
});
Specialization.belongsToMany(User, {
  through: UserSpecialization,
  foreignKey: 'specialization_id',
});

module.exports = UserSpecialization;
