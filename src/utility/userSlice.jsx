import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    userData: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload; // Set all users
    },
    removeUser: (state, action) => {
      state.userData = state.taskData.filter(user => user._id !== action.payload);
    },
    restoreUser: (state, action) => {
      state.taskData.push(action.payload);
    },
  }
});

export const { setUser, removeUser, restoreUser } = userSlice.actions;
export default userSlice.reducer;
