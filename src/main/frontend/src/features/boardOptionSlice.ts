import { createSlice } from "@reduxjs/toolkit";
import { BoardOptionState } from "../types/reducers/BoardOptionsSlice";

const initialState: BoardOptionState = {
  value: false,
};

export const boardOptionSlice = createSlice({
  name: "boardOptions",
  initialState,
  reducers: {
    toggleBoardVisibility: (state: BoardOptionState) => {
      const previousState = state.value;
      state.value = !previousState;
    },
  },
});

export const { toggleBoardVisibility } = boardOptionSlice.actions;
export default boardOptionSlice.reducer;
