import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "events",
  initialState: {
    allEvents: [],
  },
  reducers: {
    setEvents: (state, action) => {
      state.allEvents = action.payload
        .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
        .reverse();
    },
    eraseEvents: (state) => {
      state.allEvents = null;
    },
  },
});

export const { setEvents, eraseEvents } = eventSlice.actions;

export const selectEvents = (state) => state.events.allEvents;

export default eventSlice.reducer;
