const getConnection = require('../connectors/mysqlConnector');
const queryHelper = require('../utils/queryHelper');

exports.getSpecializationsFilters = async () => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query('SELECT * FROM specializations', (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  });
};

exports.getLanguagesFilters = async () => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query('SELECT * FROM languages', (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  });
};

exports.getSearchResults = async ({
  specializations,
  languages,
  nameOrFirm,
}) => {
  const searchQuery = queryHelper.createSearchQuery({
    specializations,
    languages,
    nameOrFirm,
  });
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(searchQuery, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  });
};
