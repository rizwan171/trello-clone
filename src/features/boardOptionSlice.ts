import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const boardOptionSlice = createSlice({
  name: "boardOptions",
  initialState,
  reducers: {
    toggleBoardVisibility: (state) => {
      const previousState = state.value;
      state.value = !previousState;
    },
  },
});

export const { toggleBoardVisibility } = boardOptionSlice.actions;
export default boardOptionSlice.reducer;
