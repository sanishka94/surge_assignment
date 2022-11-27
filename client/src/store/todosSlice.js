import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const todosAdapter = createEntityAdapter({
  selectId: (todo) => todo._id,
  sortComparer: (a, b) => b.createdDate.localeCompare(a.createdDate),
});

const initialState = todosAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (userData) => {
    const responseRaw = await fetch("http://localhost:8080/todos/get-todos", {
      headers: {
        Authorization: "Bearer " + userData.token,
      },
    });
    const response = await responseRaw.json();
    return response.data;
  }
);

export const addTodo = createAsyncThunk("todos/addTodo", async (todoData) => {
  const responseRaw = await fetch("http://localhost:8080/todos/add-todo", {
    headers: {
      Authorization: "Bearer " + todoData.token,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      title: todoData.title,
      description: todoData.description,
    }),
  });
  const response = await responseRaw.json();
  console.log("response", response.data);
  return response.data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todoData) => {
    const responseRaw = await fetch("http://localhost:8080/todos/update-todo", {
      headers: {
        Authorization: "Bearer " + todoData.token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: todoData.id,
        title: todoData.title,
        description: todoData.description,
        status: todoData.status,
      }),
    });
    const response = await responseRaw.json();
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoData) => {
    const responseRaw = await fetch("http://localhost:8080/todos/delete-todo", {
      headers: {
        Authorization: "Bearer " + todoData.token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: todoData.id,
      }),
    });
    const response = await responseRaw.json();
    return response.data;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    sortEntities(state, action) {
      state.sortby = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload && action.payload.length > 0) {
          todosAdapter.upsertMany(state, action.payload);
        }
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(addTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "idle";
        todosAdapter.addOne(state, action.payload);
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = "idle";
        todosAdapter.updateOne(state, action.payload);
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "idle";
        todosAdapter.removeOne(state, action.payload._id);
      });
  },
});

// export const { todoStatusUpdated } = todosSlice.actions;

export default todosSlice.reducer;

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors((state) => state.todos);
