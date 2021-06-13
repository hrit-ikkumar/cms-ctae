import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "./firebase";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export const signInAsync = (authUser) => async (dispatch) => {
  try {
    const user = await db.collection("users").doc(authUser.uid).get();
    dispatch(signIn(user.data()));
  } catch (error) {
    throw error.message;
  }
};

export const signOutAsync = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch(signOut());
  } catch (error) {
    throw error.message;
  }
};

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
