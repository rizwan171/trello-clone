import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const selectedTagColourSlice = createSlice({
  name: "selectedTagColour",
  initialState,
  reducers: {
    setSelectedTagColour: (state, action) => {
      state.value = action.payload;
    },
    clearSelectedTagColour: (state) => {
      state.value = "";
    },
  },
});

export const { setSelectedTagColour, clearSelectedTagColour } = selectedTagColourSlice.actions;
export default selectedTagColourSlice.reducer;
