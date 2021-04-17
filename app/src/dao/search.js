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

exports.getNameOrFirmSuggestions= async (nameOrFirm) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query("select specialization from specializations WHERE specialization LIKE ?" +
      " UNION select CONCAT(first_name,' ', last_name ) as name from users where CONCAT(first_name, ' ', last_name) LIKE ?",
      [nameOrFirm,nameOrFirm],
       (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  });
};

exports.getLocationSuggestions= async (nameOrFirm) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query("select location from users where location LIKE '%?%'",
      [nameOrFirm],
       (error, result) => {
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
  page,
}) => {
  const searchQuery = queryHelper.createSearchQuery({
    specializations,
    languages,
    nameOrFirm,
    page,
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
