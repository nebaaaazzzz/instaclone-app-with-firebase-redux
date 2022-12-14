import { configureStore } from "@reduxjs/toolkit";
import currentUser from "./features/user";
import posts from "./features/posts";
import following from "./features/following";
export const store = configureStore({
  reducer: {
    user: {
      currentUser,
      posts,
      following,
    },
    users: {
      users: [],
      usersFollowingLoaded: 0,
    },
  },
});
