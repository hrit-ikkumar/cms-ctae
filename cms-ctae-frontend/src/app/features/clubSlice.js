import { createSlice } from "@reduxjs/toolkit";

export const clubSlice = createSlice({
  name: "club",
  initialState: {
    clubInfo: null,
    clubPostData: null,
  },
  reducers: {
    setClubInfo: (state, action) => {
      state.clubInfo = action.payload; // set club information
    },
    setClubPostData: (state, action) => {
      state.clubPostData = action.payload; // set club post data
    },
  },
});

export const { setClubInfo, setClubPostData } = clubSlice.actions;

export const selectClubInfo = (state) => state.club.clubInfo;

export const selectClubPostData = (state) => state.club.clubPostData;

export default clubSlice.reducer;
