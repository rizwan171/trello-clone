import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const createTagMenuDataSlice = createSlice({
  name: "createTagMenuData",
  initialState,
  reducers: {
    setCreateTagMenuData: (state, action) => {
      state.value = { ...action.payload };
    },
    clearCreateTagMenuData: (state) => {
      state.value = null;
    },
  },
});

export const { setCreateTagMenuData, clearCreateTagMenuData } = createTagMenuDataSlice.actions;
export default createTagMenuDataSlice.reducer;
