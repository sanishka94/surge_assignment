const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Auth = require("./middleware/auth");
const userController = require("./controllers/user");
const todoController = require("./controllers/todo");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://mongo:27017/surge-todolist", (err) => {
  if (err) {
    console.log(err);
  }
});

app.post("/user/register", userController.registerUser);
app.post("/user/login", userController.loginUser);

app.post("/todos/add-todo", Auth, todoController.addTodo);
app.use("/todos/get-todos", Auth, todoController.getTodos);
app.post("/todos/update-todo", Auth, todoController.updateTodo);
app.post("/todos/delete-todo",Auth, todoController.deleteTodo)

app.get("/", (req, res, next) => {
  res.status(200).send("Welcome Surge Todo List server");
});

const PORT = parseInt(process.env.PORT || 8080);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
