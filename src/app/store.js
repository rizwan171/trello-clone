import { configureStore } from '@reduxjs/toolkit';
import listsReducer from '../features/listsSlice.js';

export const store = configureStore({
  reducer: {
    lists: listsReducer
  }
});