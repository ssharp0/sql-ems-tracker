-- Drop database if exists staff database
DROP DATABASE IF EXISTS staff_db;

-- Create staff database
CREATE DATABASE staff_db;

-- Use staff database
USE staff_db;

-- create departments table
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

-- create roles table
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  -- GAAP goes to 4 decimal places
  salary DECIMAL(19,4) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- create employees table
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
  FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);