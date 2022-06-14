import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const currentSelectedCardSlice = createSlice({
  name: "currentSelectedCard",
  initialState,
  reducers: {
    setCurrentSelectedCard: (state, action) => {
      state.value = { ...action.payload };
    },
    clearSelectedCard: (state, _) => {
      state.value = null;
    },
  },
});

export const { setCurrentSelectedCard, clearSelectedCard } = currentSelectedCardSlice.actions;
export default currentSelectedCardSlice.reducer;
