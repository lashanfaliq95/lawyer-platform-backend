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
      mysql.format(inArray, ['specialization_id', specializations]);
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

const getLimitStatement= (page=0) => {
  const startRecord=(page-1)*20;
  const uptoRecord=(page)*20;
    return mysql.format(
      " LIMIT ?, ? ",
      [startRecord,uptoRecord]
    );  
};

exports.createSearchQuery = ({ specializations, languages, nameOrFirm, page }) => {
  const selectUsersStatement =
    "SELECT DISTINCT id, CONCAT(first_name,' ', last_name ) as name,email, address, firm, image_url as imgUrl, mobile_phone as mobilePhone, latitude, longitude, specializationIds FROM users"
    +" left join (select user_id, group_concat(specialization_id) as specializationIds from user_specializations group by user_id) a on users.id=a.user_id";
  const joinStatement = getJoinQuery({ specializations, languages });
  const likeStatement = getLikeStatement({ nameOrFirm });
  const limitStatement=getLimitStatement(page);
  
  return `${selectUsersStatement} ${joinStatement} ${likeStatement} ${limitStatement};`;
};
