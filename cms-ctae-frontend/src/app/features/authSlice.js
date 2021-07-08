import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
    setClubName: (state, action) => {
      state.user.clubName = action.payload;
    }
  },
});

export const { signIn, signOut, setUser, setClubName } = authSlice.actions;

export const signInAsync = (authUser) => async (dispatch) => {
  try {
    const user = null;
    dispatch(signIn(user));
  } catch (error) {
    throw error.message;
  }
};

export const signOutAsync = () => async (dispatch) => {
  try {
    dispatch(signOut());
  } catch (error) {
    throw error.message;
  }
};

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
