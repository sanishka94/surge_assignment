import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../store/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userStatus = useSelector(state => state.user.userStatus)
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(removeToken())
  };

  useEffect(() => {
    if(userStatus !== "logged in"){
      navigate("/login", {replace: true})
    }
  }, [userStatus])
  return (
    <div className="navbar-wrapper">
      <div className="navbar-content">
        <h1>Surge Todo List</h1>
        {userStatus === "logged in" ? <Button onClick={logout}>Log out</Button> : ""}
      </div>
      
    </div>
  );
};

export default Navbar;
