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
      return { ...state, tasks: [...state.tasks, action.payload] };
    },
    // editTask: (state, action) => {
    //   console.log("action.payload", action.payload);
    //   return {
    //     ...state,
    //     tasks: [
    //       ...state.tasks.map((item) =>
    //         item.name === action.payload.name ? { ...action.payload } : item
    //       ),
    //     ],
    //   };
    // },
    editTask: (state, action) => {
      return {
        ...state,
        tasks: [...action.payload],
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
    clearTasks: (state, action) => {
      return { tasks: [] };
    },
  },
});

export const { addInitial, addTask, editTask, deleteTask, clearTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
