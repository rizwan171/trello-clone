import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import boardReducer from "../features/boardSlice";
import listsReducer from "../features/listsSlice";
import cardsReducer from "../features/cardsSlice";
import boardOptionsReducer from "../features/boardOptionSlice";
import currentSelectedCardReducer from "../features/currentSelectedCardSlice";
import currentSelectedListReducer from "../features/currentSelectedListSlice";
import listOptionsMenuPositionReducer from "../features/listOptionsMenuPositionSlice";
import tagsReducer from "../features/tagsSlice";
import selectedTagColourReducer from "../features/selectedTagColourSlice";
import createTagMenuDataReducer from "../features/createTagMenuDataSlice";
import modalActionMenusVisibilityReducer from "../features/modalActionMenusVisibilitySlice";

const rootReducer = combineReducers({
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
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
export type AppStore = ReturnType<typeof setupStore>