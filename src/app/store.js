import { configureStore } from '@reduxjs/toolkit';
import listsReducer from '../features/listsSlice.js';
import cardsReducer from '../features/cardsSlice.js';

export const store = configureStore({
  reducer: {
    lists: listsReducer,
    cards: cardsReducer,
  }
});