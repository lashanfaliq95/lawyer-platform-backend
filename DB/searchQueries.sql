-- --By name
-- SELECT * FROM users WHERE CONCAT( firstName,  ' ', lastName ) LIKE  '%rohs%';

-- --By name and firm
-- SELECT *  FROM users WHERE CONCAT( firstName,  ' ', lastName ) LIKE  '%jung%' OR firm LIKE '%clp%';

-- --Only specialization filter active
-- select * from users 
-- left join user_languages on users.id=user_languages.userId
-- where languageId in(1);

-- --Only language filter active
-- select * from users 
-- left join user_specializations on users.id=user_specializations.userId  
-- where specilization_id in(1);


-- --By  specialization and lanaguages
-- select * from users 
-- left join user_specializations on users.id=user_specializations.userId  
-- left join user_languages on users.id=user_languages.userId
-- where specilization_id in(1) and languageId in(1);

-- --Search by name when specialization and lanuguges active
-- select * from users 
-- left join user_specializations on users.id=user_specializations.userId  
-- left join user_languages on users.id=user_languages.userId
-- where specilization_id in(1) and languageId in(1) AND (CONCAT( firstName,  ' ', lastName ) LIKE  '%rohs%' OR firm LIKE '%clp%') ;


-- --For avilability
-- SELECT * FROM lawyer_availability WHERE date> NOW() AND date < DATE_ADD(NOW(),INTERVAL 5 DAY);


-- select * from users left join user_specializations on users.id=user_specializations.userId left join user_languages on users.id=user_languages.userId where specilization_id in (1) and languageId in (1) AND(CONCAT(firstName, ' ', lastName) LIKE  '%roh%' OR firm LIKE '%roh%');

-- select * from users left join (select userId, group_concat(specilization_id) from user_specializations group by userId) a on users.id=a.userId;
