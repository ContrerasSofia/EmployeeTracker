DROP DATABASE IF EXISTS EMPLOYEESTRACKER_db;
CREATE DATABASE EMPLOYEESTRACKER_db;

USE EMPLOYEESTRACKER_db;

CREATE TABLE DEPARTMENTS (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE ROLES (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary FLOAT NOT NULL,
  department_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (department_id) REFERENCES DEPARTMENTS(id) ON DELETE SET NULL
);

CREATE TABLE EMPLOYEES(
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES ROLES(id) ON DELETE SET NULL
);

ALTER TABLE EMPLOYEES ADD CONSTRAINT `fk_recursiva_employees` FOREIGN KEY (manager_id) REFERENCES `EMPLOYEES` (id) ON DELETE SET NULL; 