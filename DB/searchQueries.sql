-- --By name
-- SELECT * FROM users WHERE CONCAT( first_name,  ' ', last_name ) LIKE  '%rohs%';

-- --By name and firm
-- SELECT *  FROM users WHERE CONCAT( first_name,  ' ', last_name ) LIKE  '%jung%' OR firm LIKE '%clp%';

-- --Only specialization filter active
-- select * from users 
-- left join user_languages on users.id=user_languages.user_id
-- where language_id in(1);

-- --Only language filter active
-- select * from users 
-- left join user_specializations on users.id=user_specializations.user_id  
-- where specilization_id in(1);


-- --By  specialization and lanaguages
-- select * from users 
-- left join user_specializations on users.id=user_specializations.user_id  
-- left join user_languages on users.id=user_languages.user_id
-- where specilization_id in(1) and language_id in(1);

-- --Search by name when specialization and lanuguges active
-- select * from users 
-- left join user_specializations on users.id=user_specializations.user_id  
-- left join user_languages on users.id=user_languages.user_id
-- where specilization_id in(1) and language_id in(1) AND (CONCAT( first_name,  ' ', last_name ) LIKE  '%rohs%' OR firm LIKE '%clp%') ;


-- --For avilability
-- SELECT * FROM lawyer_availability WHERE date> NOW() AND date < DATE_ADD(NOW(),INTERVAL 5 DAY);


-- select * from users left join user_specializations on users.id=user_specializations.user_id left join user_languages on users.id=user_languages.user_id where specilization_id in (1) and language_id in (1) AND(CONCAT(first_name, ' ', last_name) LIKE  '%roh%' OR firm LIKE '%roh%');

-- select * from users left join (select user_id, group_concat(specilization_id) from user_specializations group by user_id) a on users.id=a.user_id;
