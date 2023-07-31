const department = [
  {
    type: 'input',
    message: 'What is the the name of the department?',
    name: 'name',
  }];

const role = [
  {
    type: 'input',
    message: 'What is the the title of the role?',
    name: 'title',
  },
  {
    type: 'input',
    message: 'What is the the salary of the role?',
    name: 'salary',
  }
];

const employee = [
  {
    type: 'input',
    message: 'What is the the first name?',
    name: 'firstName',
  },
  {
    type: 'input',
    message: 'What is the the last name?',
    name: 'lastName',
  }
];


  module.exports = {
    department, role, employee
  };