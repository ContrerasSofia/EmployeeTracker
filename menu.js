var inquirer = require('inquirer');
const ques = require('./Lib/questions.js');

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
module.exports = {
    init
};
    
function addMenu(){
    inquirer
        .prompt(ques.questions[1])
        .then((response) => { 
            console.log(response);
        });
    }