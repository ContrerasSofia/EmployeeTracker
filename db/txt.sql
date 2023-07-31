-- VIEW ALL ROLES -- 
-- SELECT rl.id, rl.title TITLE, rl.salary SALARY, dp.NAME DEPARTMENT FROM DEPARTMENTS dp INNER JOIN ROLES rl ON rl.department_id = dp.id;

-- VIEW ALL DEPARTMENTS --
-- SELECT dp.id, dp.name NAME FROM DEPARTMENTS dp;

-- The total utilized budget of a department -- 
-- SELECT dp.id, dp.name DEPARTMENT, TRUNCATE(SUM(nt.salary),2) BUDGET FROM (SELECT rl.title ROLE, SUM(rl.salary) SALARY, rl.department_id FROM employees em INNER JOIN ROLES rl ON em.role_id = rl.id GROUP BY rl.id) nt INNER JOIN departments dp ON nt.department_id = dp.id GROUP BY dp.id;


--SELECT CONCAT(nt.firstName, " ", nt.lastName) NAME, nt.ROLE FROM (SELECT em.firstName,  em.lastName, rl.title ROLE, rl.department_id FROM roles rl INNER JOIN employees em ON em.role_id = rl.id) nt INNER JOIN DEPARTMENTS dp ON nt.department_id = dp.id WHERE dp.name = 'Sales';