CREATE DATABASE advoplan;
USE advoplan;

    CREATE TABLE specializations(
        id INT NOT NULL  AUTO_INCREMENT, 
        name VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
    );

   CREATE TABLE time_slot(
        id INT NOT NULL auto_increment,
        time_range VARCHAR(100) NOT NULL,
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
        first_name VARCHAR(100) NOT NULL, 
        last_name VARCHAR(100) NOT NULL, 
        email VARCHAR(100) NOT NULL,
        mobile_phone VARCHAR(20) NOT NULL,
        password VARCHAR(100) NOT NULL,
        reset_token VARCHAR(100),
        reset_token_expiration VARCHAR(100),
        fax VARCHAR(20),
        firm VARCHAR(100),
        role_id INT NOT NULL,
        expert_type VARCHAR(100),
        gender VARCHAR(5),
        image_url VARCHAR(100),
        road VARCHAR(100),
        house_number VARCHAR(10),
        city VARCHAR(100),
        zip_code VARCHAR(20),
        longitude DECIMAL(9,6), 
        latitude DECIMAL(8,6),
        FOREIGN KEY (role_id) REFERENCES roles(id),
        PRIMARY KEY (id)
    );

    CREATE TABLE user_specializations(
        user_id VARCHAR(100) NOT NULL,
        specialization_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (specialization_id) REFERENCES specializations(id),
        PRIMARY KEY(user_id,specialization_id)
    );

      CREATE TABLE user_languages(
        user_id VARCHAR(100) NOT NULL,
        language_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (language_id) REFERENCES languages(id),
        PRIMARY KEY(user_id,language_id)
    );

    CREATE TABLE user_messages(
        id INT AUTO_INCREMENT,
        user_id VARCHAR(100) NOT NULL,
        message VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        PRIMARY KEY(id)
    );

    CREATE TABLE appointments(
        id INT PRIMARY key auto_increment, 
        user_id VARCHAR(100) NOT NULL,
        lawyer_id VARCHAR(100) NOT NULL,
        time_slot INT NOT NULL,
        date DATE NOT NULL,
        FOREIGN KEY (time_slot) REFERENCES time_slot(id),
        FOREIGN KEY (lawyer_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE week_days(
        id INT PRIMARY key auto_increment, 
        name VARCHAR(100) NOT NULL
    );

    CREATE TABLE lawyer_availability(
        lawyer_id VARCHAR(100) NOT NULL,
        time_slot INT NOT NULL,
        date DATE NOT NULL,
        day_of_week INT NOT NULL,
        available BOOLEAN DEFAULT TRUE,
        FOREIGN KEY (day_of_week) REFERENCES week_days(id),
        FOREIGN KEY (time_slot) REFERENCES time_slot(id),
        FOREIGN KEY (lawyer_id) REFERENCES users(id) ON DELETE CASCADE,
        PRIMARY KEY(lawyer_id,time_slot,date)
    );

    CREATE TABLE auth(
        id INT PRIMARY key auto_increment, 
        refresh_token VARCHAR(100) 
    );


    CREATE TABLE tutorial_availability(
        from_time TIME not null,
        to_time TIME not null,
        is_blocked BOOLEAN DEFAULT false,
        date DATE
    );

    CREATE TABLE default_tutorial_availability(
        day_of_week INT NOT NULL,
        from_time TIME not null,
        to_time TIME not null
    );

    

