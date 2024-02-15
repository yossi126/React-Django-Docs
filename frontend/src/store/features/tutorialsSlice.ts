import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/todos";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (thunkAPI) => {
    const response = await axios.get(`${url}`);
    return response.data;
  }
);

interface User {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TutorialsState {
  data: User[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: TutorialsState = {
  data: [],
  loading: "idle",
};

export const tutorialsSlice = createSlice({
  name: "tutorials",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        // state.data.push(...action.payload);
        console.log(action);
      }
    );
  },
});

export default tutorialsSlice.reducer;
