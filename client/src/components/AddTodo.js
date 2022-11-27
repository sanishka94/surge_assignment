import React, { useState } from "react";
import { TextField, TextareaAutosize, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { addTodo } from "../store/todosSlice";

import "./AddTodo.css";

const AddTodo = () => {
  const token = useSelector((state) => state.user.userToken);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    dispatch(addTodo({ title, description, token }));
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="add-todo">
      <form onSubmit={handleAddTodo} className="add-todo-form">
        <TextField
          id="title"
          variant="standard"
          type="text"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          label="Title"
          sx={{ marginBottom: "20px" }}
        />
        <TextareaAutosize
        minRows={3}
        placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default AddTodo;
