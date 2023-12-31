const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const menu = require('./menu.js');
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

menu.init();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
