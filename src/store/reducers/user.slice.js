import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    name: "",
    email: "",
    displayPicture: "",
    id: null,
  },
  reducers: {
    update: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { update } = userSlice.actions;

export default userSlice.reducer;
