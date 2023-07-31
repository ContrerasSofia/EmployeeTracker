const questions = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'main',
    choices: 
        ['Add', 
        'Delete', 
        'Update', 
        'View',
        'Quit\n']
  },
  {
    type: 'list',
    message: 'What would you like to View?',
    name: 'view',
    choices: 
        ['All employees', 
        'All roles', 
        'All departments', 
        'The total utilized budget of a department',
        'View employees by department',
        'View employees by manager',
        'Quit']
  },
  {
    type: 'list',
    message: 'What would you like to Add?',
    name: 'add',
    choices: 
        ['Employee', 
        'Role', 
        'Departments',
        'Quit']
  },
  {
    type: 'list',
    message: 'What would you like to Update?',
    name: 'update',
    choices: 
        ['Employee manager', 
        'Employee role',
        'Quit']
  },
  {
    type: 'list',
    message: 'What would you like to Delete?',
    name: 'delete',
    choices: 
        ['Employee', 
        'Role', 
        'Departments',
        'Quit']
  },];

  module.exports = {
    questions
  };