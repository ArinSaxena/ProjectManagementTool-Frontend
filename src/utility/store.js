import authSlice from "./authSlice";
import trashSlice from "./trashSlice";
import taskSlice from "./taskSlice";

import { configureStore } from "@reduxjs/toolkit";

const Store = configureStore({
  reducer: {
    auth: authSlice,
    trash:trashSlice,
    task: taskSlice
  },
});

export default Store;
