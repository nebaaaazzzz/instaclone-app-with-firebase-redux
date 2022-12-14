import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export const fetchUserPosts = createAsyncThunk("posts", async (userId) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, `posts/${userId}/userPosts`)
    );

    return querySnapshot.docs.map((doc) =>
      Object.assign(doc.data(), { timestamp: doc.data().timestamp.seconds })
    );
  } catch (err) {
    console.log(err);
  }
});

export const postsSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
  extraReducers: {
    [fetchUserPosts.fulfilled]: function (state, action) {
      return (state = action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default postsSlice.reducer;
