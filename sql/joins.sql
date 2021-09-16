-- use db and select all departments
USE staff_db;
SELECT * FROM departments;

USE staff_db;
-- join roles and departments on departments id
SELECT roles.id, roles.title, roles.salary, departments.name AS department
FROM roles
INNER JOIN departments
ON roles.department_id = departments.id;

USE staff_db;
-- join roles and departments on departments id
SELECT roles.id, roles.title, roles.salary, departments.name AS department
FROM departments
LEFT JOIN roles
ON roles.department_id = departments.id
UNION
SELECT roles.id, roles.title, roles.salary, departments.name AS department
FROM departments
RIGHT JOIN roles
ON roles.department_id = departments.id;

USE staff_db;
-- join employees and roles and departments for full view
SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS name,
 roles.title,
 roles.salary,
 departments.name AS department,
 CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employees
LEFT JOIN roles
ON employees.role_id = roles.id
LEFT JOIN departments
ON roles.department_id = departments.id
LEFT JOIN employees manager
ON manager.id = employees.manager_id;

USE staff_db;
-- join roles and departments to see total budget by department
SELECT departments.id AS id, departments.name AS department, SUM(salary) AS budget 
FROM roles
JOIN departments ON roles.department_id = departments.id GROUP BY department_id;






