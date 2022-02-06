import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const cardsData = JSON.parse(localStorage.getItem("cards"));
const initialState = {
  value: cardsData ? cardsData : [],
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.value.push({ ...action.payload, id: uuidv4() });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
  },
});

export const { addCard } = cardsSlice.actions;
export default cardsSlice.reducer;
