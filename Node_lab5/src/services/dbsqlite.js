const sqlite3 = require("sqlite3");
const path = require("path");

const db_name = path.join(__dirname, "..", "data", "todo.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) return console.error(err.message);
  console.log("Successfully connected to the database");
});

const sql_create = `CREATE TABLE IF NOT EXISTS Todos (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title VARCHAR(100) NOT NULL 
);`;

db.run(sql_create, err => {
  if (err) return console.error(err.message);

  const sql_insert = `INSERT INTO Todos (ID, Title) VALUES
    (1, 'Buy Cake'),
    (2, 'Sleep');`;

  db.run(sql_insert, err => {
    if (err) return console.error(err.message);

    console.log("Successfully created Todos table");
  });
});

module.exports = db;
