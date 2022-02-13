import { configureStore } from "@reduxjs/toolkit";
import listsReducer from "../features/listsSlice.js";
import cardsReducer from "../features/cardsSlice.js";
import boardOptionsReducer from "../features/boardOptionSlice.js";
import currentSelectedCardReducer from "../features/currentSelectedCardSlice.js";

export const store = configureStore({
  reducer: {
    lists: listsReducer,
    cards: cardsReducer,
    boardOptions: boardOptionsReducer,
    currentSelectedCard: currentSelectedCardReducer,
  },
});
