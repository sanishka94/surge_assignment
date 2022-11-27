const Todo = require("../models/todo");

exports.getTodos = async (req, res, next) => {
  if (!req.isAuth) {
    return res
      .status(401)
      .send({ message: "Not Authorized", status: "failed" });
  }
  let todos;
  try {
    todos = await Todo.find({ userId: req.userId });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Could not find todos", status: "failed" });
  }

  res.status(200).send({ status: "success", data: todos });
};

exports.addTodo = async (req, res, next) => {
  if (!req.isAuth) {
    return res
      .status(401)
      .send({ message: "Not Authorized", status: "failed" });
  }
  const data = req.body;
  let todo;
  try {
    todo = await Todo.create({
      title: data.title,
      description: data.description,
      status: "todo",
      userId: req.userId,
    });
  } catch (err) {
    return res.status(500).send({ message: "Update failed", status: "failed" });
  }
  console.log(todo);
  res.status(200).send({
    status: "success",
    data: todo,
  });
};

exports.updateTodo = async (req, res, next) => {
  if (!req.isAuth) {
    return res
      .status(401)
      .send({ message: "Not Authorized", status: "failed" });
  }
  const data = req.body;

  let todo;
  try {
    todo = await Todo.findOneAndUpdate(
      { _id: data.id },
      {
        title: data.title,
        description: data.description,
        status: data.status,
      }
    );
  } catch (err) {
    return res.status(500).send({ message: "Update failed", status: "failed" });
  }
  console.log(todo);
  res.status(200).send({
    status: "success",
    data: todo,
  });
};

exports.deleteTodo = async (req, res, next) => {
  if (!req.isAuth) {
    return res
      .status(401)
      .send({ message: "Not Authorized", status: "failed" });
  }
  const data = req.body;

  let todo;
  try {
    todo = await Todo.findOneAndDelete({ _id: data.id });
  } catch (err) {
    return res.status(500).send({ message: "Update failed", status: "failed" });
  }
  console.log(todo);
  res.status(200).send({
    status: "success",
    data: todo,
  });
};
