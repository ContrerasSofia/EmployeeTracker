require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'EMPLOYEESTRACKER_db'
    },
    console.log(`Connected to the EMPLOYEESTRACKER_db database.`)
  );

class View {
    getEmployees(){
      return new Promise((resolve, reject)=>{
        db.query('SELECT nt.FIRST_NAME, nt.LAST_NAME, nt.ROLE, nt.SALARY, CONCAT(e.firstName, " ", e.lastName) AS MANAGER FROM (SELECT em.id, em.firstName FIRST_NAME,  em.lastName LAST_NAME, rl.title ROLE, rl.salary SALARY, em.manager_id FROM roles rl INNER JOIN employees em ON em.role_id = rl.id) nt, EMPLOYEES e WHERE e.id = nt.manager_id',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            console.table(elements);
            return resolve(elements);

        });
      }); 
    }

    getRoles(){
      const sql = 'SELECT rl.title TITLE, rl.salary SALARY, dp.NAME DEPARTMENT FROM DEPARTMENTS dp INNER JOIN ROLES rl ON rl.department_id = dp.id'
      db.query(sql, function (err, results) {
        console.table(results);
      });
    }
    getDepartments(){
      const sql = 'SELECT dp.name NAME FROM DEPARTMENTS dp;'
      db.query(sql, function (err, results) {
        console.table(results);
      });
    }
    getBudget(){
      const sql = 'SELECT dp.name DEPARTMENT, TRUNCATE(SUM(nt.salary),2) BUDGET FROM (SELECT rl.title ROLE, SUM(rl.salary) SALARY, rl.department_id FROM employees em INNER JOIN ROLES rl ON em.role_id = rl.id GROUP BY rl.id) nt INNER JOIN departments dp ON nt.department_id = dp.id GROUP BY dp.id;'
      db.query(sql, function (err, results) {
          console.table(results);
      });
    }
  }
  

module.exports = {
    View
};