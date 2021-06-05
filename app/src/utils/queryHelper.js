const mysql = require('mysql2');

const leftJoin = 'LEFT JOIN ?? on ??=?? ';
const inArray = '?? in (?) AND ';

const getJoinQuery = ({ specializations, languages, firm }) => {
  let joinStatement = '';
  let whereConditions = '';

  if (specializations && specializations.length > 0) {
    joinStatement =
      joinStatement +
      mysql.format(leftJoin, [
        'user_specializations',
        'users.id',
        'user_specializations.userId',
      ]);

    whereConditions =
      whereConditions +
      mysql.format(inArray, ['specialization_id', specializations]);
  }
  if (languages && languages.length > 0) {
    joinStatement =
      joinStatement +
      mysql.format(leftJoin, [
        'user_languages',
        'users.id',
        'user_languages.userId',
      ]);

    whereConditions =
      whereConditions + mysql.format(inArray, ['languageId', languages]);
  }

  return `${joinStatement} WHERE roleId=2 AND${whereConditions}`;
};

const getLikeStatement = ({ nameOrFirm }) => {
  if (nameOrFirm) {
    const matchNameOrFirm = `%${nameOrFirm}%`;
    return mysql.format(
      "(CONCAT(firstName, ' ', lastName) LIKE ? OR firm LIKE ?)",
      [matchNameOrFirm, matchNameOrFirm]
    );
  }
  return true;
};

const getLimitStatement = (page = 0) => {
  const startRecord = (page - 1) * 20;
  const uptoRecord = page * 20;
  return mysql.format(' LIMIT ?, ? ', [startRecord, uptoRecord]);
};

exports.createSearchQuery = ({
  specializations,
  languages,
  nameOrFirm,
  page,
}) => {
  const selectUsersStatement =
    "SELECT DISTINCT users.id, CONCAT(firstName,' ', lastName ) as name, email, road, houseNumber, city, zipCode, firms.name as firm, profileImageUrl as imgUrl, mobilePhone, latitude, longitude, expertId, city, gender, specializationIds FROM users" +
    ' left join (select userId, group_concat(specialization_id) as specializationIds from user_specializations group by userId) a on users.id=a.userId' +
    ' left join firms on users.firmId=firms.id';
  const joinStatement = getJoinQuery({ specializations, languages });
  const likeStatement = getLikeStatement({ nameOrFirm });
  const limitStatement = getLimitStatement(page);
console.log(`${selectUsersStatement} ${joinStatement} ${likeStatement} ${limitStatement};`)
  return `${selectUsersStatement} ${joinStatement} ${likeStatement} ${limitStatement};`;
};
