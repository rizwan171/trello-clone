import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const listData = JSON.parse(localStorage.getItem("lists"));

const initialState = {
  value: listData ? listData : [],
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action) => {
      state.value.push({ ...action.payload, id: uuidv4() });
      localStorage.setItem("lists", JSON.stringify([...state.value]));
    },
    editTitle: (state, action) => {
      const { listId, newTitle } = action.payload;
      const listIndex = state.value.findIndex((list) => list.id === listId);
      state.value[listIndex].title = newTitle;
      localStorage.setItem("lists", JSON.stringify([...state.value]));
    },
    removeList: (state, action) => {
      const listIndex = state.value.findIndex((list) => list.id === action.payload);
      state.value = state.value.filter((list) => list.id !== listIndex);
      localStorage.setItem("lists", JSON.stringify([...state.value]));
    },
    reorderList: () => {},
  },
});

export const { addList, editTitle } = listsSlice.actions;
export default listsSlice.reducer;
