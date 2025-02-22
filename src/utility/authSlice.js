import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"User",
    initialState:{
        userData:null,
    },
    reducers:{
        setCurrentUser:(state,action) =>{
            const user = action.payload;
            state.userData= user;
        },
        removeCurrentUser:(state,action)=>{
            state.userData = "";
        }
    }
})

export const {setCurrentUser,removeCurrentUser} =authSlice.actions;
export default authSlice.reducer;