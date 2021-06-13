import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import eventsReducer from "./eventsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
  },
});
