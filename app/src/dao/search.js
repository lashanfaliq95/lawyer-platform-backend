const { Op, QueryTypes } = require('sequelize');

const { Specialization, Language, User } = require('../models/index');
const sequelize = require('../connectors/database');
const queryHelper = require('../utils/queryHelper');

exports.getSpecializationsFilters = () => {
  return Specialization.findAll();
};

exports.getLanguagesFilters = () => {
  return Language.findAll();
};

exports.getNameOrFirmSuggestions = (nameOrFirm) => {
  return sequelize.query(
    'SELECT specialization from specializations WHERE specialization LIKE ?' +
      " UNION select CONCAT(first_name,' ', last_name ) as name from users where role_id=2 AND CONCAT(first_name, ' ', last_name) LIKE ?",
    {
      replacements: [nameOrFirm, nameOrFirm],
      type: QueryTypes.SELECT,
    }
  );
};

exports.getLocationSuggestions = (nameOrFirm) => {
  return User.findAll({ where: { location: { [Op.substring]: nameOrFirm } } });
};

exports.getSearchResults = ({
  specializations,
  languages,
  nameOrFirm,
  page,
}) => {
  const searchQuery = queryHelper.createSearchQuery({
    specializations,
    languages,
    nameOrFirm,
    page,
  });

  return sequelize.query(searchQuery, { type: QueryTypes.SELECT });
};
