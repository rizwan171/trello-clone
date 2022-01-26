import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = { 
  value: []
}

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action) => {
      state.value.push({ ...action.payload, id: uuidv4() });
    },
    editTitle: (state, action) => {
      const { listId, newTitle } = action.payload;
      const listIndex = state.value.findIndex(list => list.id === listId);
      state.value[listIndex].title = newTitle;
    },
    removeList: (state, action) => {
      // TODO
    },
    reorderList: () => {

    }
  }
})

export const { addList, editTitle, } = listsSlice.actions;
export default listsSlice.reducer;
