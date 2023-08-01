var inquirer = require('inquirer');
const ques = require('./Lib/questions.js');
const addques = require('./Lib/addQuestions.js');
const query = require('./Lib/querys.js');
const opt = require('./Lib/utils.js');
const { response } = require('express');
const view = new query.View;
const delt = new query.Delete;
const insert = new query.Insert;


function init() {
    inquirer
        .prompt(ques.questions[0])
        .then((response) => { 
            switch (response.main) {
                case 'View':
                    viewMenu();
                    break;
                case'Delete':
                    deleteMenu();
                    break;
                case'Update':
                    updateMenu()
                    break;
                case'Add':
                    addMenu();
                    break;         
                default:
                    console.log('bye');
                    break;
            }
        });
}   


function viewEmployeeByDepartmet(){
    return new Promise((resolve, reject)=>{
        Promise.resolve(view.getDepartments()).then((value) =>{
            Promise.resolve(opt.getOptions(value, 'department')).then((question) =>{
            inquirer
                .prompt(question)
                .then((response) => { 
                    Promise.resolve(view.getEmployeeByDepartment(response))
                    .then((elements) => console.table(elements))
                    .then(() => {return resolve()})
                });
            });
        }); 
    });
}

function viewEmployeeByManager(){
    return new Promise((resolve, reject)=>{
        Promise.resolve(view.getManagers()).then((value) =>{
            Promise.resolve(opt.getOptions(value, 'manager')).then((question) =>{
            inquirer
                .prompt(question)
                .then((response) => { 
                    Promise.resolve(view.getEmployeeByManager(response))
                    .then((elements) => console.table(elements))
                    .then(() => {return resolve()})
                });
            });
        }); 
    });
}

function deleteEmployee(){
    return new Promise((resolve, reject)=>{
        Promise.resolve(view.getEmployees()).then((value) =>{
            Promise.resolve(opt.getOptions(value, 'employee')).then((question) =>{
                inquirer
                    .prompt(question)
                    .then((response) => { 
                        Promise.resolve(delt.deleteEmployeeRow(response.employee))
                        .then(() => {return resolve()})
                    });
                });
        }); 
    });
}

function deleteRoles(){
    return new Promise((resolve, reject)=>{
        Promise.resolve(view.getRolesbyName()).then((value) =>{
            Promise.resolve(opt.getOptions(value, 'role')).then((question) =>{
                inquirer
                    .prompt(question)
                    .then((response) => { 
                        Promise.resolve(delt.deleteRolesRow(response.role))
                        .then(() => {return resolve()})
                    });
                });
        }); 
    });
}

function deleteDepartment(){
    return new Promise((resolve, reject)=>{
        Promise.resolve(view.getDepartments()).then((value) =>{
            Promise.resolve(opt.getOptions(value, 'department')).then((question) =>{
                inquirer
                    .prompt(question)
                    .then((response) => { 
                        Promise.resolve(delt.deleteDepartmentRow(response.department))
                        .then(() => {return resolve()})
                    });
                });
        }); 
    });
}

function viewMenu(){
    inquirer
        .prompt(ques.questions[1])
        .then((response) => { 
            
            switch (response.view) {
                case 'All employees':
                    Promise.resolve(view.getEmployees())
                    .then((response) => 
                        console.table(response)
                    )
                    .then(() =>
                        init()
                    );
                    break;
                case 'All roles':
                    Promise.resolve(view.getRoles())
                    .then((response) => 
                        console.table(response)
                    )
                    .then(() =>
                        init()
                    );
                    break;
                case 'All departments':
                    Promise.resolve(view.getDepartments())
                    .then((response) => 
                        console.table(response)
                    )
                    .then(() =>
                        init()
                    );
                    break;
                case 'The total utilized budget of a department':
                    Promise.resolve(view.getBudget()).then(() => init());                    
                    break;
                case 'View employees by department':
                    Promise.resolve(viewEmployeeByDepartmet()).then(() => init());
                    break;
                case 'View employees by manager':
                    Promise.resolve(viewEmployeeByManager()).then(() => init());                
                    break;
                case'Quit':
                    console.log('bye');
                    break;
                default:
                    init();
                    break;
            }
        
           
        })
    }

function deleteMenu(){
    inquirer
    .prompt(ques.questions[4])
        .then((response) => { 
            switch (response.delete) {
                case 'Employee':
                    Promise.resolve(deleteEmployee())
                    .then(() =>
                        init()
                    );
                    break;
                case 'Role':
                    Promise.resolve(deleteRoles())
                    .then(() =>
                        init()
                    );
                    break;
                case 'Departments':
                    Promise.resolve(deleteDepartment())
                    .then(() =>
                        init()
                    );
                    break;
                case'Quit':
                    console.log('bye');
                    break;
                default:
                    init();
                    break;
            }
        })
}

function addMenu(){
    inquirer
    .prompt(ques.questions[2])
        .then((response) => { 
            switch (response.add) {
                case 'Employee':
                    inquirer.prompt(addques.employee).then((response1) => {
                        Promise.resolve(view.getManagers()).then((value) =>{
                            Promise.resolve(opt.getOptions(value, 'manager')).then((question) =>{
                                inquirer
                                    .prompt(question)
                                    .then((manager) => { 
                                        Promise.resolve(view.getRoles()).then((value) =>{
                                            Promise.resolve(opt.getOptions(value, 'roles')).then((question) =>{
                                                inquirer
                                                    .prompt(question)
                                                    .then((roles) => { 
                                                        Promise.resolve(insert.addEmployee(response1, manager, roles))
                                                        .then(() => init())
                                                    });
                                                });
                                        }); 
                                    });
                                });
                        }); 
                    })
                    break;
                case 'Role':
                    inquirer.prompt(addques.role).then((response1) => {
                        Promise.resolve(view.getDepartments()).then((value) =>{
                            Promise.resolve(opt.getOptions(value, 'department')).then((question) =>{
                                inquirer
                                    .prompt(question)
                                    .then((response2) => { 
                                       Promise.resolve(insert.addRole(response1, response2))
                                       .then(() => init())
                                    });
                                });
                        }); 
                    })
                    break;
                case 'Departments':
                    inquirer.prompt(addques.department)
                        .then((response) => insert.addDepartment(response.name))
                        .then(() => init());
                    break;
                case'Quit':
                    console.log('bye');
                    break;
            }
        })
}

function updateMenu(){
    const updte = new query.Update;
    inquirer
    .prompt(ques.questions[3])
        .then((response) => { 
            switch (response.update) {
                case 'Employee manager':
                    Promise.resolve(view.getEmployees()).then((value) =>{
                        Promise.resolve(opt.getOptions(value, 'employee')).then((question) =>{
                            inquirer
                                .prompt(question)
                                .then((employee) => { 
                                    Promise.resolve(view.getManagers()).then((value) =>{
                                        Promise.resolve(opt.getOptions(value, 'manager')).then((question) =>{
                                            inquirer
                                                .prompt(question)
                                                .then((manager) => { 
                                                    Promise.resolve(updte.updateEmployeeManager(employee, manager))
                                                    .then(() => init())
                                                });
                                            });
                                    }); 
                                });
                            });
                    }); 
                    break;
                case 'Employee role':
                    Promise.resolve(view.getEmployees()).then((value) =>{
                        Promise.resolve(opt.getOptions(value, 'employee')).then((question) =>{
                            inquirer
                                .prompt(question)
                                .then((employee) => { 
                                    Promise.resolve(view.getRoles()).then((value) =>{
                                        Promise.resolve(opt.getOptions(value, 'role')).then((question) =>{
                                            inquirer
                                                .prompt(question)
                                                .then((role) => { 
                                                    Promise.resolve(updte.updateEmployeeRole(employee, role))
                                                    .then(() => init())
                                                });
                                            });
                                    }); 
                                });
                            });
                    }); 
                    break;
                case'Quit':
                    console.log('bye');
                    break;
                default:
                    init();
                    break;
            }
        }) 
}

module.exports = {
    init
};
        