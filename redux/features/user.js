import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (userId) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      return { ...docSnap.data(), uid: userId };
    } catch (err) {
      throw err;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
