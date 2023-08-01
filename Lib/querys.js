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
        db.query('SELECT CONCAT(nt.FIRST_NAME, " ",nt.LAST_NAME) NAME, nt.ROLE, nt.SALARY, CONCAT(e.firstName, " ", e.lastName) AS MANAGER FROM (SELECT em.id, em.firstName FIRST_NAME,  em.lastName LAST_NAME, rl.title ROLE, rl.salary SALARY, em.manager_id FROM roles rl INNER JOIN employees em ON em.role_id = rl.id) nt, EMPLOYEES e WHERE e.id = nt.manager_id',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
      }); 
    }

    getRoles(){
      return new Promise((resolve, reject)=>{
        db.query('SELECT rl.title NAME, rl.salary SALARY, dp.NAME DEPARTMENT FROM DEPARTMENTS dp INNER JOIN ROLES rl ON rl.department_id = dp.id',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);

        });
      }); 
    }

    getRolesbyName(){
      return new Promise((resolve, reject)=>{
        db.query('SELECT rl.title NAME FROM ROLES rl GROUP BY rl.id',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);

        });
      }); 
    }

    getDepartmentid(name){
      return new Promise((resolve, reject)=>{
        db.query('SELECT dp.id  FROM DEPARTMENTS dp WHERE name = ?;', name, (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
      });
    }

    getRoleid(name){
      return new Promise((resolve, reject)=>{
        db.query('SELECT dp.id FROM ROLES dp WHERE title = ?;', name, (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
      });
    }

    getManagerid(name){
      return new Promise((resolve, reject)=>{
        db.query('SELECT dp.id  FROM EMPLOYEES dp WHERE CONCAT(dp.firstName, " ", dp.lastName) = ?;', name, (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
      });
    }

    getDepartments(){
      return new Promise((resolve, reject)=>{
        db.query('SELECT dp.name NAME, dp.id  FROM DEPARTMENTS dp;',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);

        });
      });
    }

    getBudget(){
      return new Promise((resolve, reject)=>{
        db.query('SELECT dp.name DEPARTMENT, TRUNCATE(SUM(nt.salary),2) BUDGET FROM (SELECT rl.title ROLE, SUM(rl.salary) SALARY, rl.department_id FROM employees em INNER JOIN ROLES rl ON em.role_id = rl.id GROUP BY rl.id) nt INNER JOIN departments dp ON nt.department_id = dp.id GROUP BY dp.id;',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            console.table(elements);
            return resolve(elements);
        });
      });
    }

    getEmployeeByDepartment(department){
      return new Promise((resolve, reject)=>{
        db.query('SELECT CONCAT(nt.firstName, " ", nt.lastName) NAME, nt.ROLE FROM (SELECT em.firstName,  em.lastName, rl.title ROLE, rl.department_id FROM roles rl INNER JOIN employees em ON em.role_id = rl.id) nt INNER JOIN DEPARTMENTS dp ON nt.department_id = dp.id WHERE dp.name = ?;', department.department, (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
      });
    }

    getManagers(){
      return new Promise((resolve, reject)=>{
        db.query('SELECT CONCAT(mg.firstName, " ", mg.lastName) AS NAME FROM employees e INNER JOIN employees mg on mg.id = e.manager_id GROUP by mg.id;',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
      });
    }

    getEmployeeByManager(mg){
      return new Promise((resolve, reject)=>{
        db.query('SELECT CONCAT(e.firstName, " ", e.lastName) AS EMPLOYEES FROM employees e INNER JOIN employees mg on mg.id = e.manager_id WHERE CONCAT(mg.firstName, " ", mg.lastName) = ?',mg.manager, (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
      });
    }
  }

  const v = new View;
class Delete {
  

  deleteEmployeeRow(reference){
    return new Promise((resolve, reject)=>{
      db.query('DELETE FROM EMPLOYEES e WHERE CONCAT(e.firstName, " ", e.lastName) = ?', reference, (error, elements)=>{
          if(error){
              return reject(error);
          }
          console.log("Delete succsseful!!")
          return resolve(elements);
      });
    });
  }
  
  deleteRolesRow(reference){
    return new Promise((resolve, reject)=>{
      db.query('DELETE FROM ROLES WHERE title = ?', reference, (error, elements)=>{
          if(error){
              return reject(error);
          }
          console.log("Delete succsseful!!")
          return resolve(elements);
      });
    });
  }

  deleteDepartmentRow(reference){
    return new Promise((resolve, reject)=>{
      db.query('DELETE FROM DEPARTMENTS WHERE name = ?', reference, (error, elements)=>{
          if(error){
              return reject(error);
          }
          console.log("Delete succsseful!!")
          return resolve(elements);
      });
    });
  }

}

class Update{
  update(sql, value){
    return new Promise((resolve, reject) => {
      db.query(sql, value, (error, elements)=>{
        if(error){
            return reject(error);
        }
        console.log("The employee has been update!")
        return resolve(elements);
      });
    }) 
  }

  updateEmployeeManager(employeeName, managerName){
    const sql = 'UPDATE EMPLOYEES e SET e.manager_id = ? WHERE CONCAT(e.firstName, " ", e.lastName) = ?;';
    return new Promise((resolve, reject) => {
      Promise.resolve( v.getManagerid(managerName.manager))
        .then((response1) => {
          Promise.resolve(this.update(sql, [response1[0].id, employeeName.employee]))
            .then((response) => {return resolve(response)})
        })
    })
  }

  updateEmployeeRole(employeeName, roleName){
    const sql = 'UPDATE EMPLOYEES e SET e.role_id = ? WHERE CONCAT(e.firstName, " ", e.lastName) = ?;';
    return new Promise((resolve, reject) => {
      Promise.resolve( v.getRoleid(roleName.role))
        .then((response1) => {
          Promise.resolve(this.update(sql, [response1[0].id, employeeName.employee]))
            .then((response) => {return resolve(response)})
        })
    })
  }
}  

class Insert{

  addDepartment(reference){
    return new Promise((resolve, reject)=>{
      db.query('INSERT INTO DEPARTMENTS (NAME) VALUES (?);', reference, (error, elements)=>{
          if(error){
              return reject(error);
          }
          console.log("Insertion succsseful!!")
          return resolve(elements);
      });
    });
  }

  addEmployee(data, managers, role){
    return new Promise((resolve, reject) => {
      Promise.resolve( v.getManagerid(managers.manager))
        .then((response1) => {
          Promise.resolve( v.getRoleid(role.roles))
          .then((response2) => {
            db.query('INSERT INTO EMPLOYEES (firstName, lastName, role_id,  manager_id) VALUES (?,?,?, ?);',[data.firstName, data.lastName, response2[0].id, response1[0].id], (error, elements)=>{
              if(error){
                  return reject(error);
              }
              console.log("Insertion succsseful!!")
              return resolve(elements);
            });
          })
        })
    })
  }

  addRole(data, name){
    let v = new View;
    return new Promise((resolve, reject)=>{
      Promise.resolve( v.getDepartmentid(name.department))
        .then((response) => {
          db.query('INSERT INTO ROLES (title, salary, department_id) VALUES (?,?,?);',[data.title, data.salary, response[0].id], (error, elements)=>{
            if(error){
                return reject(error);
            }
            console.log("Insertion succsseful!!")
            return resolve(elements);
          });
        })
    }); 
  }

  insertRole(){}
  insertDepartment(){}
}
module.exports = {
    View, Delete, Insert, Update
};