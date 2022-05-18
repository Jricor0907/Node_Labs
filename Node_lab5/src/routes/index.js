const router = require("express").Router();
const db = require("../services/dbsqlite");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM Todos ORDER BY Title";
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);

    res.render("index", { model: rows });
  });
});

router.get("/create", (req, res) => {
  res.render("create", { model: {} });
});

router.post("/create", (req, res) => {
  const sql = "INSERT INTO Todos (Title) VALUES (?)";
  const todo = [req.body.Title];

  db.run(sql, todo, err => {
    if (err) return console.error(err.message);

    res.redirect("/");
  });
});

router.get("/edit/:id", (req, res) => {
  const sql = "SELECT * FROM Todos WHERE ID = ?";
  const id = req.params.id;

  db.get(sql, [id], (err, row) => {
    if (err) return console.error(err.message);

    res.render("edit", { model: row });
  });
});

router.post("/edit/:id", (req, res) => {
  const sql = "UPDATE Todos SET Title = ? WHERE ID = ?";
  const todo = req.body.Title;
  const id = req.params.id;
  console.log(todo, id);

  db.run(sql, [todo, id], err => {
    if (err) return console.error(err.message);

    const sql = "SELECT * FROM Todos ORDER BY Title";
    db.all(sql, [], (err, rows) => {
      if (err) return console.error(err.message);

      res.render("index", { model: rows });
    });
  });
  res.redirect("/");
});

router.post("/delete/:id", (req, res) => {
  const sql = "DELETE FROM Todos WHERE ID = ?";
  const id = [req.params.id];

  db.run(sql, id, err => {
    if (err) return console.log(err.message);
  });
  res.redirect("/");
});

module.exports = router;
