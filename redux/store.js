import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentUser from "./features/user";
import posts from "./features/posts";
import following from "./features/following";
export const store = configureStore({
  reducer: {
    currentUser,
    posts,
    following,
  },
});
