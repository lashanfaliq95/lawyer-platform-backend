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
  foreignKey: 'userId',
});
Language.belongsToMany(User, {
  through: UserLanguage,
  foreignKey: 'languageId',
});

module.exports = UserLanguage;
