import React, { useEffect } from "react";
import { List, CircularProgress } from "@mui/material";

import Todo from "../components/Todo";

import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, selectTodoIds} from "../store/todosSlice";
import AddTodo from "../components/AddTodo";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const todoIds = useSelector(selectTodoIds);
  const todoStatus = useSelector((state) => state.todos.status);
  const token = useSelector((state) => state.user.userToken);

  useEffect(() => {
    if (todoStatus === "idle" && token !== null) {
      dispatch(fetchTodos({ token }));
    } else if (!token){
      navigate("/login", {replace: true})
    }
  }, [todoStatus, dispatch, token]);

  let todoList;
  if (todoStatus === "loading") {
    todoList = (
      <div className="circular-progress-wrapper">
        <CircularProgress />
      </div>
    );
  } else if (todoStatus === "success") {
    todoList = todoIds.map((todoId) => <Todo key={todoId} todoId={todoId} />);
  }

  return (
    <div className="todolist-wrapper">
      <AddTodo />
      <div className="todolist">
        <List>{todoList}</List>
      </div>
    </div>
  );
};

export default TodoList;
