var inquirer = require('inquirer');
const ques = require('./Lib/questions.js');
const query = require('./Lib/querys.js');
const opt = require('./helpers/utils.js');
const view = new query.View;

function init() {
        inquirer
        .prompt(ques.questions[0])
        .then((response) => { 
            validateData(response);
        });
    
}

function validateData(response){
    switch (response.main) {
        case 'View':
            addMenu();
            break;
        case'Quit':     
        default:
            console.log('bye');
            break;
    }
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

function addMenu(){
    inquirer
        .prompt(ques.questions[1])
        .then((response) => { 
            
            switch (response.view) {
                case 'All employees':
                    Promise.resolve(view.getEmployees()).then(() => init());
                    break;
                case 'All roles':
                    Promise.resolve(view.getRoles()).then(() => init());
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

module.exports = {
    init
};
        