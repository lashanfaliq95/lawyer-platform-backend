const mysql = require('mysql');

const leftJoin = 'LEFT JOIN ?? on ??=?? ';
const inArray = '?? in (?) AND ';

const getJoinQuery = ({ specializations, languages }) => {
  let joinStatement = '';
  let whereConditions = '';

  if (specializations && specializations.length > 0) {
    joinStatement =
      joinStatement +
      mysql.format(leftJoin, [
        'user_specializations',
        'users.id',
        'user_specializations.user_id',
      ]);

    whereConditions =
      whereConditions +
      mysql.format(inArray, ['specilization_id', specializations]);
  }
  if (languages && languages.length > 0) {
    joinStatement =
      joinStatement +
      mysql.format(leftJoin, [
        'user_languages',
        'users.id',
        'user_languages.user_id',
      ]);

    whereConditions =
      whereConditions + mysql.format(inArray, ['language_id', languages]);
  }
  return `${joinStatement} WHERE role_id=2 AND${whereConditions}`;
};

const getLikeStatement = ({ nameOrFirm }) => {
  if (nameOrFirm) {
    const matchNameOrFirm = `%${nameOrFirm}%`;
    return mysql.format(
      "(CONCAT(first_name, ' ', last_name) LIKE ? OR firm LIKE ?)",
      [matchNameOrFirm, matchNameOrFirm]
    );
  }
  return true;
};

exports.createSearchQuery = ({ specializations, languages, nameOrFirm }) => {
  const selectUsersStatement =
    "SELECT DISTINCT id, CONCAT(first_name,' ', last_name ) as name,email, address, firm, image_url as imgUrl, mobile_phone as mobilePhone, latitude, longitude FROM users";
  const joinStatement = getJoinQuery({ specializations, languages });
  const likeStatement = getLikeStatement({ nameOrFirm });

  return `${selectUsersStatement} ${joinStatement} ${likeStatement};`;
};
