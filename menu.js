var inquirer = require('inquirer');
const ques = require('./Lib/questions.js');
const query = require('./Lib/querys.js');
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

function addMenu(){
    inquirer
        .prompt(ques.questions[1])
        .then((response) => { 
            
            switch (response.view) {
                case 'All employees':
                    Promise.resolve(view.getEmployees()).then(() => init());
                    break;
                case 'All roles':
                    view.getRoles();
                    break;
                case 'All departments':
                    view.getDepartments();
                    break;
                case 'The total utilized budget of a department':
                    view.getBudget();
                    break;
                default:
                    console.log('Wrong shape type');
            }
        
           
        })
    }

module.exports = {
    init
};
        