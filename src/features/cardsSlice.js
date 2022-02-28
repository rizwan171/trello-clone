import { createSlice, current } from "@reduxjs/toolkit";
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
    updateCardContent: (state, action) => {
      state.value.map((card) => {
        if (card.id === action.payload.id) {
          card.content = action.payload.content;
        }
        return card;
      });
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
    copyCardToList: (state, action) => {
      const cardToCopy = state.value.find((card) => card.id === action.payload.cardId);
      state.value.push({
        ...cardToCopy,
        id: uuidv4(),
        listId: action.payload.listId,
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    moveCardToList: (state, action) => {
      state.value.map((card) => {
        if (card.id === action.payload.cardId) {
          card.listId = action.payload.listId;
        }

        return card;
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    copyAllCardsToNewList: (state, action) => {
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

export const {
  addCard,
  updateAllCards,
  updateCardContent,
  deleteCard,
  deleteAllListCards,
  deleteAllCards,
  copyAllCardsToNewList,
  copyCardToList,
  moveCardToList,
} = cardsSlice.actions;
export default cardsSlice.reducer;
