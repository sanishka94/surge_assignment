import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  ListItem,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  TextareaAutosize,
} from "@mui/material";

import { deleteTodo, selectTodoById, updateTodo } from "../store/todosSlice";

import "./Todo.css";

const Todo = ({ todoId }) => {
  const todo = useSelector((state) => selectTodoById(state, todoId));
  const token = useSelector((state) => state.user.userToken);
  const [open, setOpen] = useState(false);

  const [status, setStatus] = useState("todo");
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    const newValue = e.target.value;
    if (newValue !== status) {
      setStatus(newValue);
      console.log("Inside todo: ", todoId);
      dispatch(
        updateTodo({
          token,
          id: todoId,
          title,
          description,
          status: newValue,
        })
      );
    }
  };

  const handleTodoClick = () => {
    setOpen(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleClose = () => {
    // setOpen(false);
  };

  const handleTodoEdit = (e) => {
    e.preventDefault();
    console.log(token);
    dispatch(
      updateTodo({
        token,
        id: todoId,
        title,
        description,
        status,
      })
    );
    setOpen(false);
  };

  const handleTodoDelete = (e) => {
    e.preventDefault()
    dispatch(deleteTodo({ token, id: todoId }));
  };
  return (
    <ListItem
      sx={{ width: "96%", margin: "20px 2%", borderBottom: "0.2px solid grey" }}
    >
      <Grid container columnSpacing={3} rowSpacing={0}>
        <Grid
          item
          xs={9}
          sx={{ display: "flex", alignItems: "center" }}
          onClick={handleTodoClick}
        >
          <strong className="todo-title">{todo.title}</strong>
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "end" }}>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120, height: "32px" }}
          >
            <Select
              value={todo.status}
              onChange={handleStatusChange}
              id="demo-select-small"
              sx={{ fontSize: "medium" }}
            >
              <MenuItem value="todo">Todo</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} onClick={handleTodoClick}>
          <p className="todo-description">{todo.description}</p>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} key={todoId}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent sx={{ width: "400px" }}>
          <form className="todo-edit-form" onSubmit={handleTodoEdit}>
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
              value={description}
              onChange={handleDescriptionChange}
            />
            <div className="button-wrapper">
              <Button type="submit">Update</Button>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleTodoDelete}>Delete</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </ListItem>
  );
};

export default Todo;
