INSERT INTO DEPARTMENTS (name)
VALUES ('Sales'),('Marketing'),('Research and development'),
       ('Finance'),('Human resourses'),('Quality assurance');

INSERT INTO ROLES (title, salary, department_id)
VALUES ('Sales representative M.', 85745.30,1), ('Sales representative', 60897.64, 1),
       ('Marketing manager', 101555.53, 2),('Marketing specialist', 81341.21, 2),
       ('development engineer', 110320.51, 3), ('Product Development Specialist', 63057.21, 3), ('Product manager', 103776.81, 3),('Project manager', 89907.00,3),
       ('Finance manager', 126768.25, 4), ('Accountant', 77250.48, 4), ('Administrative assistant', 44023.00, 4),  ('CEO', 180436.20,4),
       ('Human resources',114342.71,5),
       ('Customer service repres.', 36811.26, 6), ('quality assurance analyst', 90300.65, 6), ('quality assurance M.', 100300.65, 6);
      
INSERT INTO EMPLOYEES(firstName, lastName, role_id, manager_id)
VALUES('Noel','Williams',12, 1),('Sebastian','Harris',1,1),('Luka','Thomas',2,2),('Fred','Walker',2,2),
      ('Albert','Scott',3,1),('Terry','Mitchell',4,5),('Dave','Miller',8,1),('Riley','Smith',7,7),
      ('Miles','Anderson',6,8),('Liam','Perry',5,9),('Glen','Fletcher',5,9),('Lewis','Green',5,9),
      ('Olive','Rodriguez',9,1),('Anabelle','Hall',10,13),('Daisy','Lopez',10,13),('Alison','Baker',11,14),
      ('Miranda','Adams',11,15),('Teresa','Perez',13,1),('Melody','Gibson',13,1),('David','Reynolds',16,1),
      ('Elias', 'Burns',15,21),('Luna', 'Clark',15,21),('Hannah','Holland',14,21),('Sophie','White',14,21),
      ('Shawn','Howard',14,22),('Walter','Morgan',14,22),('Jerry','Gross',5,9);

