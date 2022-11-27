import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectTodoById } from "../store/todosSlice";

const EditTodo = ({ todoId }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

//   const todo = useSelector(selectTodoById(todoId));

  const handleClose = () => {
    setOpen(false)
  }

  const handleTodoEdit = (e) => {
    e.preventDefault()
    alert("test")
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Todo</DialogTitle>
      <DialogContent>
        <form onSubmit={handleTodoEdit}>
          <TextField
            id="title"
            // value={todo.title}
            variant="standard"
            type="text"
          />
          <Button type="submit">Update</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodo