import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import Board from "../types/Board";

const boardData: Board = JSON.parse(localStorage.getItem("board"));
const initialState: Board = {
  value: boardData ? boardData : null,
};

export const boardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setNewBoardState: (state) => {
      state.value = { id: uuidv4(), title: "New Board..." };
      localStorage.setItem("board", JSON.stringify(state.value));
    },
    updateTitle: (state, action) => {
      state.value = { ...state.value, title: action.payload };
      localStorage.setItem("board", JSON.stringify(state.value));
    },
  },
});

export const { setNewBoardState, updateTitle } = boardSlice.actions;
export default boardSlice.reducer;
