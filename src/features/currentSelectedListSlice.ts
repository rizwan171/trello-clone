import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentSelectedListState, SetCurrentSelectedListParams } from "../types/reducers/CurrentSelectedListSlice";

const initialState: CurrentSelectedListState = {
  value: null,
};

export const currentSelectedListSlice = createSlice({
  name: "currentSelectedList",
  initialState,
  reducers: {
    setCurrentSelectedList: (state: CurrentSelectedListState, action: PayloadAction<SetCurrentSelectedListParams>) => {
      state.value = { ...action.payload };
    },
    clearSelectedList: (state: CurrentSelectedListState) => {
      state.value = null;
    },
  },
});

export const { setCurrentSelectedList, clearSelectedList } = currentSelectedListSlice.actions;
export default currentSelectedListSlice.reducer;
