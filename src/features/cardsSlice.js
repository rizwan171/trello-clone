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
    updateAllCards: (state, action) => {
      state.value = [...action.payload];
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    deleteCard: (state, action) => {
      state.value = state.value.filter((card) => card.id !== action.payload);
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    deleteAllListCards: (state, action) => {
      state.value = state.value.filter((card) => card.listId !== action.payload);
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    deleteAllCards: (state) => {
      state.value = [];
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    copyCardsToNewList: (state, action) => {
      const cardsToCopy = state.value
        .filter((card) => card.listId === action.payload.from)
        .map((card) => {
          return { ...card, id: uuidv4(), listId: action.payload.to };
        });
      state.value.push(...cardsToCopy);
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
  },
});

export const { addCard, updateAllCards, deleteCard, deleteAllListCards, deleteAllCards, copyCardsToNewList } = cardsSlice.actions;
export default cardsSlice.reducer;
