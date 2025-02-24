import { createSlice } from "@reduxjs/toolkit";

const trashSlice = createSlice({
  name: "Trash",
  initialState: {
    trashData: [],
  },
  reducers: {
    setTrashTask: (state, action) => {
      state.trashData.push(action.payload); // Add task to trash
    },
    removeTrashTask: (state, action) => {
      state.trashData = state.trashData.filter(
        (task) => task._id !== action.payload
      );
    },
    setTrashProject: (state, action) => {
      state.trashData.push(action.payload); // Add project to trash
    },
    removeTrashProject: (state, action) => {
      state.trashData = state.trashData.filter(
        (project) => project._id !== action.payload
      );
    },
    setTrashUser: (state, action) => {
      state.trashData.push(action.payload); // Add user to trash
    },
    removeTrashUser: (state, action) => {
      state.trashData = state.trashData.filter(
        (user) => user._id !== action.payload
      );
    },
    emptyTrash: (state) => {
      state.trashData = []; // Delete all tasks from trash
    },
  },
});

export const {
  setTrashTask,
  removeTrashTask,
  setTrashProject,
  removeTrashProject,
  setTrashUser,
  removeTrashUser,
  emptyTrash,
} = trashSlice.actions;
export default trashSlice.reducer;
