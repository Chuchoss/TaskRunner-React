import { createSlice } from "@reduxjs/toolkit";

const toolkitSliceTimeOuts = createSlice({
  name: "TimeOuts",
  initialState: {
    initialBigTimeoutAfter: 3,
    initialTimeoutTime: 5,
    initialBigTimeoutTime: 15,
  },
  reducers: {
    decreaseInitialTimeoutTime(state) {
      if (state.initialTimeoutTime < 2) return;
      state.initialTimeoutTime--;
    },
    increaseInitialTimeoutTime(state) {
      state.initialTimeoutTime++;
    },
    setInitialTimeoutTime(state, action) {
      state.initialTimeoutTime = action.payload.newValue;
    },
    decreaseInitialBigTimeoutTime(state) {
      if (state.initialBigTimeoutTime < 2) return;
      state.initialBigTimeoutTime--;
    },
    increaseInitialBigTimeoutTime(state) {
      state.initialBigTimeoutTime++;
    },
    setInitialBigTimeoutTime(state, action) {
      state.initialBigTimeoutTime = action.payload.newValue;
    },
    decreaseInitialBigTimeoutAfter(state) {
      if (state.initialBigTimeoutAfter < 2) return;
      state.initialBigTimeoutAfter--;
    },
    increaseInitialBigTimeoutAfter(state) {
      state.initialBigTimeoutAfter++;
    },
    setInitialBigTimeoutAfter(state, action) {
      state.initialBigTimeoutAfter = action.payload.newValue;
    },
  },
});

export default toolkitSliceTimeOuts.reducer;
export const {
  decreaseInitialBigTimeoutTime,
  increaseInitialBigTimeoutTime,
  setInitialBigTimeoutTime,
  setInitialTimeoutTime,
  decreaseInitialTimeoutTime,
  increaseInitialTimeoutTime,
  decreaseInitialBigTimeoutAfter,
  increaseInitialBigTimeoutAfter,
  setInitialBigTimeoutAfter,
} = toolkitSliceTimeOuts.actions;
