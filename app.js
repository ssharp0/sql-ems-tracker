// require console table (to show a nice table layout in terminal)
require('console.table')
// require mysql2
const mysql = require('mysql2')
// create database connection
const db = mysql.createConnection('mysql://root:rootroot@localhost:3306/staff_db')
// prompt for inqurier
const { prompt } = require('inquirer')



// function to view all departments
function viewAllDepartments() {
  // database query to select departments information
  db.query('SELECT departments.id, departments.name as department FROM departments', (err, departments) => {
    if (err) { console.log(err) }
    // show table of departments in terminal
    console.table(departments)
    console.log('-------------');
    // call menu function to allow user to continue with other steps
    menu()
  })
}

// function to view all roles
function viewAllRoles() {
  // database query to select roles information and join with departments table to associate roles in departments
  db.query("SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM departments LEFT JOIN roles ON roles.department_id = departments.id UNION SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM departments RIGHT JOIN roles ON roles.department_id = departments.id", (err, roles) => {
    if (err) { console.log(err) }
    // show table of roles in terminal
    console.table(roles);
    console.log('-------------');
    // call menu function to allow user to continue with other steps
    menu()
  })
}

// function to view all employees
function viewAllEmployees() {
  // database query to select all employees and join with roles and departments to get full employee details
  db.query("SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS name, roles.title, roles.salary, departments.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id", (err, employees) => {
    if (err) { console.log(err) }
    // show table of employees in terminal
    console.table(employees);
    console.log('-------------');
    // call menu function to allow user to continue with other steps
    menu()
  })
}

// function to add a new department
function addDepartment () {
  // inquirer prompt to ask user for department name
  prompt([
    {
      type: 'input',
      name: 'name',
      message: `Please enter a new department name`
    }
  ])
  // then on response for new department name
    .then(({ name }) => {

      // assign department as  user input
      let department = {
        name: name
      }

      // database query to insert the new department name into the departments table
      db.query('INSERT INTO departments SET ?', department, (err, department) => {
        if (err => {console.log(err)})
        // log to let user know department has been added
        console.log(`----- ${name} department has been added ----`)
        console.log('-------------');
        // call menu function to allow user to continue with other steps
        menu()
      })
    })
    .catch(err => console.log(err))
}

// function to add a new role
function addRole () {
  // database query to select all departments (to use for choices)
  db.query('SELECT * FROM departments', (err, departments) => {

    // department choices will equal the list of departments in the database
    departmentChoices = departments.map(department => ({
      name: department.name,
      value: department.id
    }))

    // prompt to ask user to provide title, salary, and department to associate (by passing through choices)
    prompt([
      {
        type: 'input',
        name: 'title',
        message: `What is the title of the role to create?`
      },
      {
        type: 'input',
        name: 'salary',
        message: `What is the role's salary?`
      },
      {
        type: 'list',
        name: 'department_id',
        message: `What department does this role roll up to?`,
        choices: departmentChoices
      }
    ])
    // then on response for the title, salary, department (using the id)
      .then(({ title, salary, department_id }) => {

        // assign role as the user input
        let role = {
          title: title,
          salary: salary,
          department_id: department_id
        }

        // database query to insert the new role into the roles table
        db.query('INSERT INTO roles SET ?', role, (err, role) => {
          if(err => { console.log(err)})
          // log to let user know role has been added
          console.log(`----- ${title} role has been added ----`)
          console.log('-------------');
          // call menu function to allow user to continue with other steps
          menu()
        })
      })
      .catch(err => console.log(err))
  })
}

// function to add a new employee
function addEmployee () {
  // select all from departments, roles, and employees to use for choices
  db.query('SELECT * FROM departments', (err, departments) => {
    db.query('SELECT * FROM roles', (err, roles) => {
      db.query('SELECT * FROM employees', (err, employees) => {

        // choices to select for roles
        roleChoices = roles.map(role => ({
          name: role.title,
          value: role.id
        }))

        // choices to select for managers
        managerChoices = employees.map(employee => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        }))

        // prompt user with questions for new employees first name, last name, role, and employee manager
        prompt([
          {
            type: 'input',
            name: 'first_name',
            message: `Employee's First Name`
          },
          {
            type: 'input',
            name: 'last_name',
            message: `Employee's Last Name`
          },
          {
            type: 'list',
            name: 'role_id',
            message: `What is the employee's role?`,
            choices: roleChoices
          },
          {
            type: 'list',
            name: 'manager_id',
            message: `Who is the employee's manager?`,
            choices: managerChoices
          },
        ])
        // then the user responses
          .then(({ first_name, last_name, role_id, manager_id }) => {

            // assign employee as the infomration user responded with
            let employee = {
              first_name: first_name,
              last_name: last_name,
              role_id: role_id,
              manager_id: manager_id
            }

            // database query to insert the new employee into the employees table
            db.query('INSERT INTO employees SET ?', employee, (err, employee) => {
              if (err => { console.log(err)})
              // log to let user know employee is added
              console.log(`----- ${first_name} ${last_name} has been added as role ID ${role_id} with employee ID ${manager_id} as manager`);
              console.log('-------------');
              // call menu function to allow user to continue with other steps
              menu()
            })
          })
          .catch(err => console.log(err))
      })
    })
  })
}

// function to update employee role and manager
const updateEmployeeRoleManager = () => {
  // select all from roles and employees for choices
  db.query('SELECT * FROM roles', (err, roles) => {
    db.query('SELECT * FROM employees', (err, employees) => {

      // choices of employees to select employee to change
      employeeChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }))

      // choices of roles
      roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
      }))

      // choices of managers
      managerChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }))

      // prompt user with questions to provide employee to update the employee's role and manager
      prompt([
        {
          type: 'list',
          name: 'id',
          message: 'Select an Employee to Update',
          choices: employeeChoices
        },
        {
          type: 'list',
          name: 'role_id',
          message: `Employee's New Role: `,
          choices: roleChoices
        },
        {
          type: 'list',
          name: 'manager_id',
          message: `Employee's New Manager: `,
          choices: managerChoices
        }
      ])
      // then user responses for the employee id, role id, and manager id
        .then(({ id, role_id, manager_id }) => {

          // assign udpate as the user response
          let update = {
            manager_id,
            role_id
          }

          // database query to update employees table where the id matches the update
          db.query('UPDATE employees SET ? WHERE ?', [update, { id }], err => {
            if (err) { console.log(err) }
            // log to let user know employee has been udpated
            else { console.log('Employee has been updated') }
            console.log('-------------');
            // call menu function to allow user to continue with other steps
            menu()
          })
        })
        .catch(err => console.log(err))
    })
  })
}

// function to delete a department
function deleteDepartment () {
  // select all departments for choices
  db.query('SELECT * FROM departments', (err, departments) => {

    // department choices
    departmentChoices = departments.map(department => ({
      name: department.name,
      value: department.id
    }))

    // user prompt to ask what department they would like to delete
    prompt([
      {
        type: 'list',
        name: 'id',
        message: 'What department would you like to delete?',
        choices: departmentChoices
      }
    ])
    // then for the department delete choice
      .then(deptDelChoice => {
        
        // department as the department delete choice id
        const department = deptDelChoice.id

        // database query to delete the department from departments table where the id matches the department response
        db.query('DELETE FROM departments WHERE id = ?', department, (err, result) => {
          if (err) {console.log(err)}
          console.log('Department successfully deleted');
          // call menu function to allow user to continue with other steps
          menu()
        })
      })
      .catch(err => console.log(err))
  })
}

// function to delete role
function deleteRole () {
  // database query to select all roles
  db.query('SELECT * FROM roles', (err, roles) => {

    // role choices
    roleChoices = roles.map(role => ({
      name: role.title,
      value: role.id
    }))

    // ask user which role to delete from role choices
    prompt([
      {
        type: 'list',
        name: 'id',
        message: 'What role would you like to delete?',
        choices: roleChoices
      }
    ])
    // then for the role delete choice response
      .then(roleDelChoice => {

        // assign role as the role delete choice response id
        const role = roleDelChoice.id

        // database query to delete the role from roles where the id matches the role deletion response
        db.query('DELETE FROM roles WHERE id = ?', role, (err, result) => {
          if (err) {console.log(err)}
          // log to let user know role was deleted
          console.log('Role successfully deleted');
          // call the menu to allow the user to continue with other steps
          menu()
        })
      })
      .catch(err => console.log(err))
  })
}

// function to delete employee
function deleteEmployee () {
  // database query to select all employees for choices
  db.query('SELECT * FROM employees', (err, employees) => {

    // employee choices
    employeeChoices = employees.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }))

    // prompt user to ask which employee they would like to delete from choices
    prompt([
      {
        type: 'list',
        name: 'id',
        message: 'What employee would you like to delete?',
        choices: employeeChoices
      }
    ])
    // then for the employee delete choice 
      .then(empDelChoice => {

        // assign employee as the employee delete choice id response
        const employee = empDelChoice.id

        // database query to delete the employee from employees where the id matches the response id
        db.query('DELETE FROM employees WHERE id = ?', employee, (err, result) => {
          if (err) {console.log(err)}
          // log to let user know employee is created
          console.log('Employee successfully deleted');
          // call the menu to allow the user to continue with other steps
          menu()
        })
      })
      .catch(err => console.log(err))
  })
}

// function to view the budget by department
function viewDeptBudget () {
  // datbase query to select departments and sum the salary (as budget) by joining from roles
  db.query('SELECT departments.id AS id, departments.name AS department, SUM(salary) AS budget FROM roles JOIN departments ON roles.department_id = departments.id GROUP BY department_id', (err, budget) => {
    if (err) { console.log(err)}
    // log the budget table in the terminal
    console.table(budget);
    // call the menu to allow the user to continue with other steps
    menu()
  })
}

// function for main/start menu
function menu() {
  // prompt user with action they would like to take
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What action you like to do?',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role and/or Manager', 'Delete a Department', 'Delete a Role', 'Delete an Employee', 'View Budget by Department', 'EXIT']
    }
  ])
  // then based on user response for action switch...
    .then(({ action }) => {
      switch (action) {
        case 'View All Departments':
          console.log(`-------- See All Departments Below --------`);
          // call function to view all departments
          viewAllDepartments()
          break;
        case 'View All Roles':
          console.log(`-------- See All Roles Below --------`);
          // call function to view all roles
          viewAllRoles()
          break;
        case 'View All Employees':
          console.log(`-------- See All Employees Below --------`);
          // call function to view all employees
          viewAllEmployees()
          break;
        case 'Add a Department':
          console.log(`-------- Adding a department.... please follow prompts --------`);
          // call function to add a department
          addDepartment()
          break;
        case 'Add a Role':
          console.log(`-------- Adding a role.... please follow prompts --------`);
          // call function to add a role
          addRole()
          break;
        case 'Add an Employee':
          console.log(`-------- Adding an employee.... please follow prompts --------`);
          // call function to add an employee
          addEmployee()
          break;
        case 'Update Employee Role and/or Manager':
          console.log(`-------- Updating employee role.... please follow prompts --------`);
          // call function to udpate employee role and manager
          updateEmployeeRoleManager()
          break;
        case 'Delete a Department':
          console.log(`-------- Deleting Department.... please follow prompts --------`);
          // call function to delete a department
          deleteDepartment()
          break;
        case 'Delete a Role':
          console.log(`-------- Deleting Role.... please follow prompts --------`);
          // call function to delete a role
          deleteRole()
          break;
        case 'Delete an Employee':
          console.log(`-------- Deleting Employee.... please follow prompts --------`);
          // call function to delete an employee
          deleteEmployee()
          break;
        case 'View Budget by Department':
          console.log(`-------- Viewing budget.... --------`);
          // call functino to view the department budget
          viewDeptBudget()
          break;
        case 'EXIT':
          // exit process
          process.exit()
      }
    })
}

// call the menu to get started when in terminal: node app.js is run
console.log('Welcome to the Employee Management System. Please follow the prompts.');
menu()