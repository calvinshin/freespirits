-- Drops the freespirits_accounts database if it exists currently --
DROP DATABASE IF EXISTS freespirits_accounts;

-- Creates the "freespirits_accounts" database --
CREATE DATABASE freespirits_accounts;

-- Makes it so all of the following code will affect freespirits_accounts --
USE freespirits_accounts;

-- Creates the table "accounts" within freespirits_accounts --
CREATE TABLE accounts (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- Makes string columns called "username, password, email" which cannot contain null --
  username VARCHAR(32) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (id)
);