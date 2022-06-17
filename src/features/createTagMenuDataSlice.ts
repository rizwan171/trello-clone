import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CreateTagMenuDataState, { SetCreateTagMenuDataParams } from "../types/reducers/CreateTagMenuDataSlice";

const initialState: CreateTagMenuDataState = {
  value: null,
};

export const createTagMenuDataSlice = createSlice({
  name: "createTagMenuData",
  initialState,
  reducers: {
    setCreateTagMenuData: (state: CreateTagMenuDataState, action: PayloadAction<SetCreateTagMenuDataParams>) => {
      state.value = { ...action.payload };
    },
    clearCreateTagMenuData: (state: CreateTagMenuDataState) => {
      state.value = null;
    },
  },
});

export const { setCreateTagMenuData, clearCreateTagMenuData } = createTagMenuDataSlice.actions;
export default createTagMenuDataSlice.reducer;
