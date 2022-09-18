import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    addInitial: (state, action) => {
      return { tasks: [...action.payload] };
    },
    addTask: (state, action) => {
      return { ...state, tasks: { ...state.tasks, ...action.payload } };
    },
    editTask: (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.name === action.payload.name ? { ...action.payload } : item
        ),
      };
    },
    deleteTask: (state, action) => {
      return {
        ...state,
        tasks: [
          ...state.tasks.filter((item) => item.name !== action.payload.name),
        ],
      };
    },
  },
});

export const { addInitial, addTask, editTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
