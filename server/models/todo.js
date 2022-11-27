const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    description: String,
    status: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { collection: "Todos" }
);

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
