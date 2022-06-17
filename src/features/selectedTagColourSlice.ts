import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import SelectedTagColourState, { SetSelectedTagColourParams } from "../types/reducers/SelectedTagColourSlice";

const initialState: SelectedTagColourState = {
  value: null,
};

export const selectedTagColourSlice = createSlice({
  name: "selectedTagColour",
  initialState,
  reducers: {
    setSelectedTagColour: (state: SelectedTagColourState, action: PayloadAction<SetSelectedTagColourParams>) => {
      state.value = action.payload;
    },
    clearSelectedTagColour: (state: SelectedTagColourState) => {
      state.value = null;
    },
  },
});

export const { setSelectedTagColour, clearSelectedTagColour } = selectedTagColourSlice.actions;
export default selectedTagColourSlice.reducer;
