import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import TodoList from "./routes/TodoList";
import Login from "./routes/login";
import Register from "./routes/register";
import { checkUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  dispatch(checkUser());

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<TodoList />} exact />
        <Route path="/" element={<TodoList />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
      </Routes>
    </div>
  );
}

export default App;
