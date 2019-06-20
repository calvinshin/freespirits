DROP database IF EXISTS freespirits_db;

CREATE database freespirits_db;
USE freespirits_db;

CREATE TABLE trips(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  authorId INTEGER(11),
  title VARCHAR(100),
  destination VARCHAR(100),
  starting_date DATE,
  end_date DATE,
  duration INTEGER(2),
  travel_philosophy VARCHAR(100),
  description VARCHAR(500),
  budget_day INTEGER(4),
  currency VARCHAR(30),
  users VARCHAR(255),
  status VARCHAR(30),
  group_size INTEGER(2),
  primary_language VARCHAR(30),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE profiles(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  fname VARCHAR(50),
  lname VARCHAR(50),
  gender VARCHAR(30),
  picture VARCHAR(500),
  travel_philosophy VARCHAR(100),
  description VARCHAR(500),
  email VARCHAR(100),
  primary_language VARCHAR(30),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

INSERT INTO trips(title, authorId, destination, starting_date, end_date, duration, travel_philosophy, description, budget_day, currency, status, group_size, primary_language)
VALUES ("Trip to Mexico!", 1, "Mexico City", "2019-09-10", "2019-10-25", 10, "Wild", "Come have some fun in Mexico City!", 100, "USD", "Open", 6, "English"),
("Machu Picchu!!!!", 1, "Cusco", "2019-09-10", "2019-10-25", 4, "Wild", "Come have some fun taking a bus up to Machu Picchu!", 50, "USD", "Open", 3, "English"),
("Asia somewhere", 2, "Seoul", "2019-10-12", "2019-12-25", 19, "Foody", "I honestly just need to eat some good food and want company.", 400, "USD", "Open", 3, "English");

INSERT INTO profiles(fname, lname, travel_philosophy, description, email, primary_language, gender)
VALUES ("Janet", "Kim", "Wild", "I like to have fun and go to a lot of different places!", "test@gmail.com", "English", "female"),
("Florida", "Morrow", "Relaxed", "I like to eat food and not take a lot of photos", "florida@gmail.com", "English", "female"),
("Octoman", "Bruno", "Wild", "I want to travel the world, okay?!", "VRAII@gmail.com", "English", "male");