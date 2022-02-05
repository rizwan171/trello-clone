import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { readFileSync } from "fs";

const rawData = readFileSync("../data/data.json");
const parsedJson = JSON.parse(rawData);

const initialState = {
  value: [...parsedJson.lists],
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action) => {
      state.value.push({ ...action.payload, id: uuidv4() });
    },
    editTitle: (state, action) => {
      const { listId, newTitle } = action.payload;
      const listIndex = state.value.findIndex((list) => list.id === listId);
      state.value[listIndex].title = newTitle;
    },
    removeList: (state, action) => {
      const listIndex = state.value.findIndex((list) => list.id === action.payload);
      state.value = state.value.filter((list) => list.id !== listIndex);
    },
    reorderList: () => {},
  },
});

export const { addList, editTitle } = listsSlice.actions;
export default listsSlice.reducer;
