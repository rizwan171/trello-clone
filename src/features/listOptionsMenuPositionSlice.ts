import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ListOptionsMenuPositionState, { SendPositionDataParams } from "../types/reducers/ListOptionMenuPositionSlice";

const initialState: ListOptionsMenuPositionState = {
  value: null,
};

export const listOptionsMenuPositionSlice = createSlice({
  name: "listOptionsMenuPosition",
  initialState,
  reducers: {
    sendPositionData: (state: ListOptionsMenuPositionState, action: PayloadAction<SendPositionDataParams>) => {
      state.value = { ...action.payload };
    },
  },
});

export const { sendPositionData } = listOptionsMenuPositionSlice.actions;
export default listOptionsMenuPositionSlice.reducer;
