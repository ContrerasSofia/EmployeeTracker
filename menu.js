var inquirer = require('inquirer');
const ques = require('./Lib/questions.js');
const query = require('./querys.js');
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
        default:
            console.log('Wrong shape type');
    }
}

function addMenu(){
    inquirer
        .prompt(ques.questions[1])
        .then((response) => { 
            
            switch (response.view) {
                case 'All employees':
                    view.getEmployees();
                    break
                default:
                    console.log('Wrong shape type');
            }
        });
    }

module.exports = {
    init
};
        