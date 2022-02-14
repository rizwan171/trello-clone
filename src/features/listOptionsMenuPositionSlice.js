import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const listOptionsMenuPositionSlice = createSlice({
  name: "listOptionsMenuPosition",
  initialState,
  reducers: {
    sendPositionData: (state, action) => {
      state.value = { ...action.payload };
    }
  },
});

export const { sendPositionData } = listOptionsMenuPositionSlice.actions;
export default listOptionsMenuPositionSlice.reducer;
