import React, { useRef} from "react";
import { Paper, TextField, Button, CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../store/userSlice";

import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const userStatus = useSelector((state) => state.user.userStatus);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  if (userStatus === "registered") {
    navigate("/login", { replace: true });
  }

  const registerHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email.length > 10) {
      dispatch(registerUser({ name, email, password }));
    }
  };

  let button;
  if (status === "idle") {
    button = (
      <Button variant="text" type="submit">
        Register
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
          height: "400px",
          width: "350px",
          padding: "30px 30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form className="register-form" onSubmit={registerHandler}>
          <h2>Register</h2>
          <TextField
            variant="standard"
            id="name"
            label="Name"
            sx={{ width: "100%" }}
            inputRef={nameRef}
            type="text"
            required
          />
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
        <Link to="/login">Go to Login Page</Link>
      </Paper>
    </Container>
  );
};

export default Register;
