import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name:"Project",
    initialState:{
        projectData:[]
    },
    reducers:{
        setProject:(state,action) =>{
            state.projectData = action.payload
        },
        removeProject:(state,action) =>{
            state.projectData = state.projectData.filter(project => project._id !==action.payload);
        },
          restoreProject: (state, action) => {
            state.taskData.push(action.payload);
          },

    }
})
 export const {setProject,removeProject,restoreProject} = projectSlice.actions;
 export default projectSlice.reducer;
