# sql-ems-tracker
Employee Management System Tracker using MySQL and Node.js

<p align="center">
 <img src="https://img.shields.io/github/repo-size/ssharp0/team-summary-generator">
 <img src="https://img.shields.io/badge/Javascript-yellow">
 <img src="https://img.shields.io/badge/-node.js-green">
 <img src="https://img.shields.io/badge/-mysql2-purple">
 <img src="https://img.shields.io/badge/-inquirer npm-brown">
 <img src="https://img.shields.io/badge/-console.table npm-blue">
</p>


### Walkthrough Demo Video: https://drive.google.com/file/d/1cSdxT38DH9gx3fe35K_5qiH6u_2fdgFc/view?usp=sharing

### Github: https://github.com/ssharp0/sql-ems-tracker 

Gif video demo:
![](/assets/img/sql-ems-video.gif)

## Table of Contents

- [Description](#description)
- [User Story](#user-story)
- [Usage](#usage)
- [Installation](#installation)
- [Screenshots](#screenshots)

## Description
An command line application to manage a company's employee database using Node.js, Inquirer and MySQL (database local instance)

## User Story

User will be able to view and manage departments, roles, and employees in a company (storing data in a MySQL database and performing queries through javascript/SQL to retrieve data)

## Usage

The user will first be prompted with a series of questions after running `node app.js` 

The user will be able to add and view departments, roles, and employees. 

The user will also be able to update an existing employee's role and manager. 

The user will also be able to delete departmemts, roles, and employees. 

And, the suer will also be able to view the total utilized budget by department (total of all salaries of employees in each department)


## Installation

`npm init -y`

`npm i mysql2`

`npm i inquirer`

`npm i console.table`


## Screenshots
(MySQL local instance database stores the data - showing the SQL seed data as well as updates to database using command line)

Menu Prompt (user start):
![](/assets/img/menu-prompt.png)

View Departments, Roles, and Employees (note: all seed data is ficticious):
![](/assets/img/view-dept-roles-employees.png)

Add Departments, Roles, and Employees (note: all user provided data is ficticious)
![](/assets/img/add-dept-roles-employees.png)

Update Role and Manager (note: all user provided data is ficticious)
![](/assets/img/update-role-manager.png)

View Budget (note: all user provided data is ficticious)
![](/assets/img/view-budget-by-dept.png)

Delete Departments, Roles, and Employees (note: all user provided data is ficticious)
![](/assets/img/delete-dept-role-employee.png)