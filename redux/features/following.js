import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export const fetchUserFollowing = createAsyncThunk(
  "following",
  async (userId) => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "following", userId, "userFollowing")
      );
      return querySnapshot.docs.map((doc) => doc.id);
    } catch (err) {
      throw err;
    }
  }
);

export const followingSlice = createSlice({
  name: "following",
  initialState: [],
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserFollowing.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default followingSlice.reducer;
