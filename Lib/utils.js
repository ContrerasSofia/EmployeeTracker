function getOptions(table, nameQ ){
    var question = {
        type: 'list',
        message: 'Chosee a '+ nameQ,
        name: nameQ,
        choices: []
    }
    return new Promise((resolve, reject)=>{
        table.forEach(element => {
            question.choices.push(element.NAME);
        });
        return resolve(question);
      }); 
}

function inquirerOptions(question){
    return new Promise((resolve, reject) => {
        inquirer
            .prompt(question)
            .then((response) => { 
                return resolve(response);
            });
    })
}

module.exports = {
    getOptions, inquirerOptions
};