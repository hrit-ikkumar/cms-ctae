import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import eventsReducer from "./eventsSlice";
import logger from 'redux-logger';
import thunk from "redux-thunk";

export default configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
  },
  middleware: [thunk,logger]
});
