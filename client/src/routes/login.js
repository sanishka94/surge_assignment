import React, { useEffect, useRef } from "react";
import { Paper, TextField, Button, CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../store/userSlice";

import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const userStatus = useSelector((state) => state.user.userStatus);

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (userStatus === "logged in") {
      navigate("/", { replace: true });
    }
  }, [userStatus]);

  const loginHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email.length > 10) {
      dispatch(loginUser({ email, password }));
    }
  };

  let button;
  if (status === "idle") {
    button = (
      <Button variant="text" type="submit">
        Login
      </Button>
    );
  } else if (status === "loading") {
    button = (
      <div className="circular-progress-wrapper">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
        padding: "10% 0",
      }}
    >
      <Paper
        sx={{
          height: "300px",
          width: "350px",
          padding: "30px 30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form className="login-form" onSubmit={loginHandler}>
          <h2>Login</h2>
          <TextField
            variant="standard"
            id="email"
            label="Email"
            sx={{ width: "100%" }}
            inputRef={emailRef}
            type="email"
            required
          />
          <TextField
            variant="standard"
            id="password"
            label="Password"
            sx={{ width: "100%" }}
            inputRef={passwordRef}
            type="password"
            required
          />
          {button}
        </form>
      </Paper>
      <Paper
        sx={{
          height: "20px",
          width: "350px",
          padding: "30px 30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <Link to="/register">Go to Register Page</Link>
      </Paper>
    </Container>
  );
};

export default Login;
