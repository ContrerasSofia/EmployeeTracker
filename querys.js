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
        const sql = 'SELECT nt.id, nt.FIRST_NAME, nt.LAST_NAME, nt.ROLE, nt.SALARY, CONCAT(e.firstName, " ", e.lastName) AS MANAGER FROM (SELECT em.id em.firstName FIRST_NAME,  em.lastName LAST_NAME, rl.title ROLE, rl.salary SALARY, em.manager_id FROM roles rl INNER JOIN employees em ON em.role_id = rl.id) nt, EMPLOYEES e WHERE e.id = nt.manager_id'
        db.query(sql, function (err, results) {
            console.table(results);
          });
    }
    getRoles(){
        const sql = 'SELECT nt.id, nt.FIRST_NAME, nt.LAST_NAME, nt.ROLE, nt.SALARY, CONCAT(e.firstName, " ", e.lastName) AS MANAGER FROM (SELECT em.id em.firstName FIRST_NAME,  em.lastName LAST_NAME, rl.title ROLE, rl.salary SALARY, em.manager_id FROM roles rl INNER JOIN employees em ON em.role_id = rl.id) nt, EMPLOYEES e WHERE e.id = nt.manager_id'
        db.query(sql, function (err, results) {
            console.table(results);
          });
    }
}
  

module.exports = {
    View
};