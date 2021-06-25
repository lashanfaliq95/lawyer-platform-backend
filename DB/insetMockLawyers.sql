    INSERT INTO firms(name) values('Kanzlei Müller & Goeritz');
    
    INSERT INTO
    users( id , firstName , lastName , email , mobilePhone, password, firmId , road, houseNumber,zipCode, city,roleId, profileImageUrl, latitude, longitude,gender, expertId, fax,legalIssues, buildingParking, buildingFloor, isBuildingDisabledFriendly) 
    VALUES
    (
        'mock1', 'Kai', 'Müller', 'arwin.sedaghat@yahoo.de', '0221 0025975', 'password1', 1, 'Schellenhofweg', '4', '50858', 'Köln', 2, 'http://www.anwaltskanzlei-dr-kai-rohs.de/wp-content/uploads/kai_rohs_quadrat-300x300.png' ,51.218730, 6.781260,'male',2,'0221 0025955', 'Erstberatung Sozialgeld,Schuldnerschein Beratung,Hartz 4,Steuerrechtliche Fragen','Kostenlose Parkplätze','1. OG mit Fahrstuhl',0
    ),
        (
        'mock2', 'Puya', 'Rafaei', 'arwin.sedaghat@gmail.com', '0221 5449595', 'password1', 1, 'Frankfurter Str.' ,'192', '51065', 'Köln', 2, 'https://www.clp-rechtsanwaelte.de/wpdata/wp-content/uploads/2018/01/Katja-Jungfermann_2-1030x683.jpg' ,51.241920, 6.735210,'male',2,'0221 5449496', 'Kündigungsschutzklagen,Tarifverträge,DSVGO-Bestimmungen,Compliance','Kostenpflichtige Parkplätze','2. OG mit Fahrstuhl',0
    ),
        (
        'mock3', 'Robin', 'Goeritz', 'daryoushsedaghat@yahoo.de', '0221 3836903', 'password1', 1, 'Malteser Str.', '28', '50859', 'Köln', 2, 'https://i0.wp.com/borgelt.de/wp-content/uploads/2016/09/Rainer_Borgelt.jpg?resize=889%2C1030&ssl=1' , 51.231340, 6.782110,'male',2,'0221 5449490', 'Gesellschaftsrecht,Organrecht','Kostenlose Parkplätze','Erdgeschoss',0
    ),
    (
      'mock4', 'Paul', 'Weber', 'ariansedaghat@gmail.com', '0221 5959206','password1', null, 'Kirchröthe', '1', '95511', 'Mistelbach', 2, 'https://www.msh-rechtsanwaelte.de/wp-content/uploads/2020/07/J.Rolfes.MSH_.AnneLammers200603.125.ret5-A5-SW-1024x658.jpg' ,51.218260, 6.782280,'male',4,'0221 5449491','Immobilien,Unternehmen und Gesellschaften, Ehe, Partnerschaft & Familie,Verjährungsfristen','Kostenpflichtige Parkplätze','1. OG ohne Fahrstuhl',0
   ),
    (
      'mock5', 'Pia', 'Perez', 'arwinsedaghat@yahoo.de', '0221 6048484','password1',null, 'Rommerscheider Str.', '84B,', '51465', 'Bergisch Gladbach', 2, 'https://www.peters-legal.com/wp-content/uploads/peters-ra-schulte-jan-niklas-1.jpg' , 51.232500, 6.759500,'female',2,'0221 0025974', 'Steuern,Bilanzbuchhaltung,Umsatzsteuervoranmeldungen,Fristen','Kostenlose Parkplätze','Erdgeschoss',1
   ),
    (
      'mock6', 'Eva', 'Sanchez', 'elyasgrell@yahoo.com', '0221 3836903', 'password1', null, 'Frankfurter Str.', '192', '51065', 'Köln', 2, 'https://www.franzlegal.com/files/theme_files/lawyers/teams/FRANZlegalMC2.jpg', 51.262500, 6.8,'female',5,'0221 0025976','Erstberatung Sozialgeld,Schuldnerschein Beratung,Hartz 4','Keine Parkplätze','10. OG mit Fahrstuhl',1
   );


   INSERT INTO
   user_specializations(userId, specialization_id) 
   VALUES
   ( 'mock1', 2),
   ( 'mock2', 2),
   ( 'mock3', 12),
   ( 'mock4', 2),
   ( 'mock5', 2),
   ( 'mock6', 2),
   ( 'mock2', 6),
   ( 'mock3', 10),
   ( 'mock5', 11);

    INSERT INTO
   user_languages(userId, languageId) 
   VALUES
   ( 'mock1', 2),
   ( 'mock2', 2),
   ( 'mock3', 12),
   ( 'mock4', 2),
   ( 'mock5', 2),
   ( 'mock6', 2),
   ( 'mock2', 6),
   ( 'mock3', 10),
   ( 'mock5', 11);

   INSERT INTO lawyer_availability(lawyerId, timeslot, dayOfWeek, date, available) VALUES
   ('mock1', 2,3, STR_TO_DATE('19,06,2021','%d,%m,%Y'), TRUE),
   ('mock2', 2,2, STR_TO_DATE('18,06,2021','%d,%m,%Y'), false),
   ('mock3', 2,1, STR_TO_DATE('17,06,2021','%d,%m,%Y'), TRUE),
   ('mock4', 2,4, STR_TO_DATE('20,06,2021','%d,%m,%Y'), false),
   ('mock1', 3,4, STR_TO_DATE('21,06,2021','%d,%m,%Y'), TRUE),
   ('mock2', 4,5, STR_TO_DATE('22,06,2021','%d,%m,%Y'), TRUE),
   ('mock3', 2,4, STR_TO_DATE('25,06,2021','%d,%m,%Y'), TRUE),
   ('mock4', 3,4, STR_TO_DATE('20,06,2021','%d,%m,%Y'), TRUE);

INSERT INTO appointments(lawyerId, userId, timeSlotId, date) VALUES
   ('mock1','42f05ca1-868c-4060-92f4-bc044c67f7b5', 2, STR_TO_DATE('19,10,2020','%d,%m,%Y')),
   ('mock2','42f05ca1-868c-4060-92f4-bc044c67f7b5', 3, STR_TO_DATE('18,10,2020','%d,%m,%Y')),
   ('mock3','42f05ca1-868c-4060-92f4-bc044c67f7b5', 2, STR_TO_DATE('17,10,2020','%d,%m,%Y')),
   ('mock4', '42f05ca1-868c-4060-92f4-bc044c67f7b5',2, STR_TO_DATE('20,10,2020','%d,%m,%Y'));


insert into tutorial_availability_defaults(dayOfWeek,fromTime,toTime) values
(1,'9:00:00','9:15:00'),(2,'9:00:00','9:15:00'),(3,'9:00:00','9:15:00'),(4,'9:00:00','9:15:00'),(5,'9:00:00','9:15:00');
