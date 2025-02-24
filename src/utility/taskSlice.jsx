import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "Task",
  initialState: {
    taskData: [],
  },
  reducers: {
    setTask: (state, action) => {
      state.taskData = action.payload; // Set all tasks
    },
    removeTask: (state, action) => {
      state.taskData = state.taskData.filter(task => task._id !== action.payload);
    },
    restoreTask: (state, action) => {
      state.taskData.push(action.payload);
    },
  }
});

export const { setTask, removeTask, restoreTask } = taskSlice.actions;
export default taskSlice.reducer;
