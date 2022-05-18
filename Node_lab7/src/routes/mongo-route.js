const router = require("express").Router();
const { ObjectId, ObjectID } = require("mongodb");
const { mongoConnect } = require("../services/mongo");

router.get("/", async (req, res) => {
  const db = mongoConnect();
  const fetchedTodos = await db.collection("todos").find().toArray();
  console.log(fetchedTodos);
  const todos = fetchedTodos.map(item => ({ ID: item._id, ...item }));
  res.render("index", { model: todos });
});

router.get("/create", (req, res) => {
  res.render("create", { model: {} });
});

router.post("/create", async (req, res) => {
  const db = mongoConnect();
  db.collection("todos")
    .insertOne({ Title: req.body.Title })
    .then(result => {
      console.log("A todo has been added");
      res.redirect("/");
    });
});

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const db = mongoConnect();
  const fetchedTodo = await db
    .collection("todos")
    .findOne({ _id: ObjectId(id) });
  console.log(fetchedTodo);

  res.render("edit", { model: { ID: id, Title: fetchedTodo.Title } });
});

router.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const db = mongoConnect();
  db.collection("todos")
    .updateOne({ _id: ObjectId(id) }, { $set: { Title: req.body.Title } })
    .then(result => {
      console.log("A to do has been updated");
      res.redirect("/");
    });
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const db = mongoConnect();
  db.collection("todos")
    .deleteOne({ _id: ObjectId(id) })
    .then(result => {
      console.log("A todo has been deleted");
      res.redirect("/");
    });
});

module.exports = router;
