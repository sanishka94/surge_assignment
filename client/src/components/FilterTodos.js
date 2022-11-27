import React, { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { addTodo } from "../store/todosSlice";

import "./AddTodo.css";

const FilterTodo = () => {
  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    dispatch(addTodo({ title, description, token }));
  };

  return (
    <div className="sort-todo">
      <Button onClick={sortByCreatedDate}>Todo</Button>
      <Button onClick={sortByCreatedDate}>In Progress</Button>
      <Button onClick={sortByCreatedDate}>Done</Button>
    </div>
  );
};

export default FilterTodo;
