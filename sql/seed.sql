-- staff database
USE staff_db;

-- insert values (departments) into departments table
INSERT INTO departments (name)
VALUES ('Accounting'), ('Engineering'), ('Finance'), ('Human Resources');

-- insert values (roles) into departments table - salaries and titles are made up
INSERT INTO roles (title, salary, department_id)
VALUES ('Accounting VP', 170000.0000, 1),
('Accounting Manager', 130000.0000, 1),
('Accountant', 80000.0000, 1), 
('Engineering VP', 180000.0000, 2), 
('Engineering Manager', 150000.0000, 2), 
('Engineer', 100000.0000, 2), 
('Finance VP', 175000.0000, 3), 
('Finance Manager', 140000.0000, 3), 
('Analyst', 90000.0000, 3), 
('HR VP', 170000.0000, 4), 
('HR Manager', 140000.0000, 4), 
('HR Coordinater', 70000.0000, 4);

-- insert values (employees) into employees table - names are completely made up
INSERT INTO employees (first_jame, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, null),
('Jane', 'Carter', 2, 1),
('Carl', 'Smith', 3, 2),
-- Engineering
('Jack', 'Doe', 4, null),
-- screenshot will show Jill Notting instead of Jill Jackie for this particular employee under engineering as it was originally the seed data used, but changed names here for better clarity as same name already existed in another dept.
('Jill', 'Jackie', 5, 4),
-- screenshot will show Charlie Kay instead of Charles Want for this particular employee under engineering as it was originally the seed data used, but changed names here for better clarity as same name already existed in another dept.
('Charles', 'Want', 6, 5),
-- Finance
('Jenny', 'Doe', 7, null),
('Jill', 'Notting', 8, 7),
('Charlie', 'Kay', 9, 8),
-- HR
('Jared', 'Doe', 10, null),
('Mary', 'Jayce', 11, 10),
('Oliver', 'Joy', 12, 11);

