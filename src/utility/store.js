import authSlice from "./authSlice";
import trashSlice from "./trashSlice";
import taskSlice from "./taskSlice";
import projectSlice from "./projectSlice";
import userSlice from "./userSlice";

import { configureStore } from "@reduxjs/toolkit";

const Store = configureStore({
  reducer: {
    auth: authSlice,
    trash:trashSlice,
    task: taskSlice,
    project: projectSlice,
    user:userSlice
  },
});

export default Store;
