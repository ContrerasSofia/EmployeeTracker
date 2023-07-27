require('dotenv').config();
const express = require('express');

const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();
const menu = require('./menu.js');
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'EMPLOYEESTRACKER_db'
  },
  console.log(`Connected to the EMPLOYEESTRACKER_db database.`)
);

menu.init();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
