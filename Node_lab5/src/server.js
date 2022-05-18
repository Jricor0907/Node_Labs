require("./services/dbsqlite");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", require("./routes"));

app.listen(process.env.PORT || 8000, () =>
  console.log("Server has started...")
);
