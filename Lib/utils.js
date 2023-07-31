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

module.exports = {
    getOptions
};