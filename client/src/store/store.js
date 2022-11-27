import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todosSlice";
import userSlice from "./userSlice";

export default configureStore({
  reducer: {
    todos: todosSlice,
    user: userSlice,
  },
});
