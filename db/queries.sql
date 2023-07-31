SELECT CONCAT(e.firstName, " ", e.lastName) AS MANAGER FROM employees e INNER JOIN employees mg on mg.id = e.manager_id WHERE CONCAT(mg.firstName, " ", mg.lastName) = 'Noel Williams'
