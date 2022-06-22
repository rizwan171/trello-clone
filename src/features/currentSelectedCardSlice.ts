import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentSelectedCardState, SetCurrentSelectedCardParams } from "../types/reducers/CurrentSelectedCardSlice";

const initialState: CurrentSelectedCardState = {
  value: null,
};

export const currentSelectedCardSlice = createSlice({
  name: "currentSelectedCard",
  initialState,
  reducers: {
    setCurrentSelectedCard: (state: CurrentSelectedCardState, action: PayloadAction<SetCurrentSelectedCardParams>) => {
      state.value = { ...action.payload };
    },
    clearSelectedCard: (state: CurrentSelectedCardState) => {
      state.value = null;
    },
  },
});

export const { setCurrentSelectedCard, clearSelectedCard } = currentSelectedCardSlice.actions;
export default currentSelectedCardSlice.reducer;
