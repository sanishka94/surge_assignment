import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  userToken: null,
  userStatus: null,
  status: "idle",
  error: null,
};

export const checkUser = createAsyncThunk(
  "user/checkUser",
  async (state, action) => {
    const token = localStorage.getItem("token");
    return { userToken: token };
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData) => {
    const responseRaw = await fetch("http://localhost:8080/user/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });
    const response = await responseRaw.json();
    return response;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData) => {
    const responseRaw = await fetch("http://localhost:8080/user/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });
    const response = await responseRaw.json();
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeToken(state, action) {
      state.userToken = null;
      state.userStatus = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkUser.pending, (action, state) => {
        state.userStatus = "loading";
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        if (action.payload.userToken) {
          state.userToken = action.payload.userToken;
          state.userStatus = "logged in";
        }
      })
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload.status === "success") {
          state.userStatus = "registered";
          state.status = "idle";
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.userStatus = "failed";
        state.status = "failed";
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.status === "success") {
          state.userStatus = "logged in";
          state.userToken = action.payload.userToken;
          window.localStorage.setItem("token", action.payload.userToken);
          state.status = "idle";
        }
      });
  },
});

export const { removeToken } = userSlice.actions;

export default userSlice.reducer;
