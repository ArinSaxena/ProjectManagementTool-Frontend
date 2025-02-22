// import {createSlice } from "@reduxjs/toolkit";

// const trashSlice = createSlice({
//     name:"Trash",
//     initialState: {
//         trashData : null
//     },
//     reducers:{
//         setTrashTask:(state,action) =>{
//             const task = action.payload;
//             state.trashData= task;
//         },
//         removeTrashTask:(state,action)=>{
//             state.trashData = "";
//         }

//     }
    
// })
// export const {setTrashTask,removeTrashTask} =trashSlice.actions;
// export default trashSlice.reducer;


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
      state.trashData = state.trashData.filter(task => task._id !== action.payload);
    },
    emptyTrash: (state) => {
      state.trashData = []; // Delete all tasks from trash
    }
  }
});

export const { setTrashTask, removeTrashTask, emptyTrash } = trashSlice.actions;
export default trashSlice.reducer;
