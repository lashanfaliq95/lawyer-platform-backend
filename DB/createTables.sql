CREATE DATABASE advoplan;
USE advoplan;

    CREATE TABLE specializations(
        id INT NOT NULL  AUTO_INCREMENT, 
        specialization VARCHAR(255) NOT NULL,
        type INT NOT NULL,
        FOREIGN KEY (type) references specialization_types(id),
        PRIMARY KEY (id)
    );

    CREATE TABLE expert_types(
        id INT NOT NULL  AUTO_INCREMENT, 
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );

   CREATE TABLE time_slot(
        id INT NOT NULL auto_increment,
        time_range VARCHAR(100) NOT NULL,
        PRIMARY key(id)
    );

    CREATE TABLE roles(
        id INT  auto_increment, 
        role VARCHAR(255) NOT NULL,
        PRIMARY key(id)
    );

    CREATE TABLE languages(
        id INT  auto_increment, 
        language VARCHAR(255) NOT NULL,
        PRIMARY key(id)
    );

    CREATE TABLE users(
        id VARCHAR(255) NOT NULL, 
        first_name VARCHAR(100) NOT NULL, 
        last_name VARCHAR(100) NOT NULL, 
        email VARCHAR(255) NOT NULL,
        mobile_phone VARCHAR(20) NOT NULL,
        fax VARCHAR(20),
        address VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        firm VARCHAR(255),
        role_id INT NOT NULL,
        expert_type INT,
        gender INT,
        image_url VARCHAR(255),
        reset_token VARCHAR(255),
        reset_token_expiration VARCHAR(255),
        longitude DECIMAL(9,6), 
        latitude DECIMAL(8,6),
        country VARCHAR(255),
        zip_code INT,
        FOREIGN KEY (role_id) REFERENCES roles(id),
        FOREIGN KEY (expert_type) REFERENCES expert_types(id),
        PRIMARY KEY (id)
    );

    CREATE TABLE user_specializations(
        user_id VARCHAR(255) NOT NULL,
        specialization_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (specialization_id) REFERENCES specializations(id),
        PRIMARY KEY(user_id,specialization_id)
    );

      CREATE TABLE user_languages(
        user_id VARCHAR(255) NOT NULL,
        language_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (language_id) REFERENCES languages(id),
        PRIMARY KEY(user_id,language_id)
    );

    CREATE TABLE appointments(
        id INT PRIMARY key auto_increment, 
        user_id VARCHAR(255) NOT NULL,
        lawyer_id VARCHAR(255) NOT NULL,
        time_slot INT NOT NULL,
        date DATE NOT NULL,
        FOREIGN KEY (time_slot) REFERENCES time_slot(id),
        FOREIGN KEY (lawyer_id) REFERENCES users(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE week_days(
        id INT PRIMARY key auto_increment, 
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE lawyer_availability(
        lawyer_id VARCHAR(255) NOT NULL,
        time_slot INT NOT NULL,
        date DATE NOT NULL,
        day_of_week INT NOT NULL,
        available BOOLEAN DEFAULT TRUE,
        FOREIGN KEY (day_of_week) REFERENCES week_days(id),
        FOREIGN KEY (time_slot) REFERENCES time_slot(id),
        FOREIGN KEY (lawyer_id) REFERENCES users(id),
        PRIMARY KEY(lawyer_id,time_slot,date)
    );

    CREATE TABLE auth(
        id INT PRIMARY key auto_increment, 
        refresh_token VARCHAR(255) 
    );

