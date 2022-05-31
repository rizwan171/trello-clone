import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/boardSlice.js";
import listsReducer from "../features/listsSlice.js";
import cardsReducer from "../features/cardsSlice.js";
import boardOptionsReducer from "../features/boardOptionSlice.js";
import currentSelectedCardReducer from "../features/currentSelectedCardSlice.js";
import currentSelectedListReducer from "../features/currentSelectedListSlice.js";
import listOptionsMenuPositionReducer from "../features/listOptionsMenuPositionSlice.js";
import tagsReducer from "../features/tagsSlice.js";
import selectedTagColourReducer from "../features/selectedTagColourSlice.js";
import createTagMenuDataReducer from "../features/createTagMenuDataSlice.js";
import modalActionMenusVisibilityReducer from "../features/modalActionMenusVisibilitySlice.js";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    lists: listsReducer,
    cards: cardsReducer,
    boardOptions: boardOptionsReducer,
    currentSelectedCard: currentSelectedCardReducer,
    currentSelectedList: currentSelectedListReducer,
    listOptionsMenuPosition: listOptionsMenuPositionReducer,
    tags: tagsReducer,
    selectedTagColour: selectedTagColourReducer,
    createTagMenuData: createTagMenuDataReducer,
    modalActionMenusVisibility: modalActionMenusVisibilityReducer,
  },
});
