    INSERT INTO
    users( id , first_name , last_name , email , mobile_phone, password, firm , road, house_number, city, zip_code, role_id, image_url, latitude, longitude,gender) 
    VALUES
    (
        'mock1', 'Dr. Kai', 'Rohs', 'mockEmail1@gmail.com', 'mocknumber', 'password1', 'Anwaltskanzlei Dr. Kai Rohs', 'Graf-Adolf-Strasse', '21', '40212', 'Düsseldorf', 2, 'http://www.anwaltskanzlei-dr-kai-rohs.de/wp-content/uploads/kai_rohs_quadrat-300x300.png' ,51.218730, 6.781260,'male'
    ),
        (
        'mock2', 'Katja', 'Jungfermann', 'mockEmail2@gmail.com', 'mocknumber', 'password1', 'CLP Rechtsanwälte', 'Niederkasseler Lohweg' ,'18', '40547', 'Düsseldorf', 2, 'https://www.clp-rechtsanwaelte.de/wpdata/wp-content/uploads/2018/01/Katja-Jungfermann_2-1030x683.jpg' ,51.241920, 6.735210,'male'
    ),
        (
        'mock3', 'Dr. Rainer', 'Borgelt', 'mockEmail3@gmail.com', 'mocknumber', 'password1', 'Borgelt & Partner Rechtsanwälte mbB', 'Taubenstr.', '22', '40479', 'Düsseldorf', 2, 'https://i0.wp.com/borgelt.de/wp-content/uploads/2016/09/Rainer_Borgelt.jpg?resize=889%2C1030&ssl=1' , 51.231340, 6.782110,'male'
    ),
    (
      'mock4', 'Anne', 'Lammers', 'mockEmail4', 'mocknumber@gmail.com', 'password1', 'MSH Rechtsanwälte GbR', 'Berliner Allee', '56', '40212', 'Düsseldorf', 2, 'https://www.msh-rechtsanwaelte.de/wp-content/uploads/2020/07/J.Rolfes.MSH_.AnneLammers200603.125.ret5-A5-SW-1024x658.jpg' ,51.218260, 6.782280,'female'
   ),
    (
      'mock5', 'Jan Niklas', 'Schulte', 'mockEmail5', 'mocknumber@gmail.com', 'password1', 'PETERS RechtsanwältePartnerschaftsgesellschaft mbB', 'Burggrafenstrasse', '5', '40545', 'Düsseldorf', 2, 'https://www.peters-legal.com/wp-content/uploads/peters-ra-schulte-jan-niklas-1.jpg' , 51.232500, 6.759500,'male'
   ),
    (
      'mock6', 'Mélanie', 'Clerc', 'mockEmail6', 'mocknumber', 'password1@gmail.com', 'FRANZ RECHTSANWÄLTE Partnerschaftsgesellschaft mbB', 'Kaistrasse', '16A', '40221', 'Düsseldorf', 2, 'https://www.franzlegal.com/files/theme_files/lawyers/teams/FRANZlegalMC2.jpg', 51.262500, 6.8,'female'
   );


   INSERT INTO
   user_specializations(user_id, specialization_id) 
   VALUES
   ( 'mock1', 1),
   ( 'mock1', 2),
   ( 'mock1', 5),
   ( 'mock1', 6),
   ( 'mock1', 10),
   ( 'mock2', 1),
   ( 'mock3', 1),
   ( 'mock4', 1),
   ( 'mock4', 3),
   ( 'mock5', 3);


    INSERT INTO
   user_languages(user_id, language_id) 
   VALUES
   ( 'mock1', 1),
   ( 'mock1', 2),
   ( 'mock1', 5),
   ( 'mock1', 6),
   ( 'mock1', 3),
   ( 'mock2', 1),
   ( 'mock3', 1),
   ( 'mock4', 1),
   ( 'mock4', 3),
   ( 'mock5', 3);

--    INSERT INTO lawyer_availability(lawyer_id, time_slot, day_of_week, date, available) VALUES
--    ('mock1', 2,3, STR_TO_DATE('19,11,2020','%d,%m,%Y'), TRUE),
--    ('mock2', 2,2, STR_TO_DATE('18,11,2020','%d,%m,%Y'), false),
--    ('mock3', 2,1, STR_TO_DATE('17,11,2020','%d,%m,%Y'), TRUE),
--    ('mock4', 2,4, STR_TO_DATE('20,11,2020','%d,%m,%Y'), false),
--    ('mock1', 3,4, STR_TO_DATE('21,11,2020','%d,%m,%Y'), TRUE),
--    ('mock2', 4,5, STR_TO_DATE('22,11,2020','%d,%m,%Y'), TRUE),
--    ('mock3', 2,4, STR_TO_DATE('25,11,2020','%d,%m,%Y'), TRUE),
--    ('mock4', 3,4, STR_TO_DATE('20,11,2020','%d,%m,%Y'), TRUE);

-- INSERT INTO appointments(lawyer_id, user_id, time_slot, date) VALUES
--    ('mock1','42f05ca1-868c-4060-92f4-bc044c67f7b5', 2, STR_TO_DATE('19,10,2020','%d,%m,%Y')),
--    ('mock2','42f05ca1-868c-4060-92f4-bc044c67f7b5', 3, STR_TO_DATE('18,10,2020','%d,%m,%Y')),
--    ('mock3','42f05ca1-868c-4060-92f4-bc044c67f7b5', 2, STR_TO_DATE('17,10,2020','%d,%m,%Y')),
--    ('mock4', '42f05ca1-868c-4060-92f4-bc044c67f7b5',2, STR_TO_DATE('20,10,2020','%d,%m,%Y'));


insert into default_tutorial_availability(day_of_week,from_time,to_time) values
(1,'9:00:00','9:15:00'),(2,'9:00:00','9:15:00'),(3,'9:00:00','9:15:00'),(4,'9:00:00','9:15:00'),(5,'9:00:00','9:15:00');
