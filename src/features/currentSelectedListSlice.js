import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const currentSelectedListSlice = createSlice({
  name: "currentSelectedList",
  initialState,
  reducers: {
    setCurrentSelectedList: (state, action) => {
      state.value = { ...action.payload };
    },
    clearSelectedList: (state, _) => {
      state.value = null;
    },
  },
});

export const { setCurrentSelectedList, clearSelectedList } = currentSelectedListSlice.actions;
export default currentSelectedListSlice.reducer;
