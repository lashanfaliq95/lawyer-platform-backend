const sequelize = require('../connectors/database');
const User = require('./user');
const Language = require('./language');

const UserLanguage = sequelize.define(
  'user_languages',
  {},
  { timestamps: false }
);

User.belongsToMany(Language, {
  through: UserLanguage,
  foreignKey: 'user_id',
});
Language.belongsToMany(User, {
  through: UserLanguage,
  foreignKey: 'language_id',
});

module.exports = UserLanguage;
