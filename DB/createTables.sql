CREATE DATABASE advoplan;
USE advoplan;

    CREATE TABLE specializations(
        id INT NOT NULL  AUTO_INCREMENT, 
        name VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
    );

   CREATE TABLE timeslot(
        id INT NOT NULL auto_increment,
        timeRange VARCHAR(100) NOT NULL,
        PRIMARY key(id)
    );

    CREATE TABLE roles(
        id INT  auto_increment, 
        role VARCHAR(100) NOT NULL,
        PRIMARY key(id)
    );

    CREATE TABLE languages(
        id INT  auto_increment, 
        language VARCHAR(100) NOT NULL,
        PRIMARY key(id)
    );

    CREATE TABLE users(
        id VARCHAR(100) NOT NULL, 
        firstName VARCHAR(100) NOT NULL, 
        lastName VARCHAR(100) NOT NULL, 
        email VARCHAR(100) NOT NULL,
        mobilePhone VARCHAR(20) NOT NULL,
        password VARCHAR(100) NOT NULL,
        reset_token VARCHAR(100),
        reset_token_expiration VARCHAR(100),
        fax VARCHAR(20),
        firm VARCHAR(100),
        roleId INT NOT NULL,
        expert_type VARCHAR(100),
        gender VARCHAR(5),
        profileImageUrl VARCHAR(100),
        road VARCHAR(100),
        houseNumber VARCHAR(10),
        city VARCHAR(100),
        zipCode VARCHAR(20),
        longitude DECIMAL(9,6), 
        latitude DECIMAL(8,6),
        FOREIGN KEY (roleId) REFERENCES roles(id),
        PRIMARY KEY (id)
    );

    CREATE TABLE user_specializations(
        userId VARCHAR(100) NOT NULL,
        specialization_id INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (specialization_id) REFERENCES specializations(id),
        PRIMARY KEY(userId,specialization_id)
    );

      CREATE TABLE user_languages(
        userId VARCHAR(100) NOT NULL,
        languageId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (languageId) REFERENCES languages(id),
        PRIMARY KEY(userId,languageId)
    );

    CREATE TABLE user_messages(
        id INT AUTO_INCREMENT,
        userId VARCHAR(100) NOT NULL,
        message VARCHAR(255) NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        PRIMARY KEY(id)
    );

    CREATE TABLE appointments(
        id INT PRIMARY key auto_increment, 
        userId VARCHAR(100) NOT NULL,
        lawyerId VARCHAR(100) NOT NULL,
        timeslot INT NOT NULL,
        date DATE NOT NULL,
        FOREIGN KEY (timeslot) REFERENCES timeslot(id),
        FOREIGN KEY (lawyerId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE week_days(
        id INT PRIMARY key auto_increment, 
        name VARCHAR(100) NOT NULL
    );

    CREATE TABLE lawyer_availability(
        lawyerId VARCHAR(100) NOT NULL,
        timeslot INT NOT NULL,
        date DATE NOT NULL,
        dayOfWeek INT NOT NULL,
        available BOOLEAN DEFAULT TRUE,
        FOREIGN KEY (dayOfWeek) REFERENCES week_days(id),
        FOREIGN KEY (timeslot) REFERENCES timeslot(id),
        FOREIGN KEY (lawyerId) REFERENCES users(id) ON DELETE CASCADE,
        PRIMARY KEY(lawyerId,timeslot,date)
    );

    CREATE TABLE auth(
        id INT PRIMARY key auto_increment, 
        refreshToken VARCHAR(100) 
    );


    CREATE TABLE tutorial_availability(
        fromTime TIME not null,
        toTime TIME not null,
        isBlocked BOOLEAN DEFAULT false,
        date DATE
    );

    CREATE TABLE default_tutorial_availability(
        dayOfWeek INT NOT NULL,
        fromTime TIME not null,
        toTime TIME not null
    );

    

