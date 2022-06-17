import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import Board from "../types/global/Board";
import BoardState from "../types/reducers/BoardSlice";

const boardData: Board = JSON.parse(localStorage.getItem("board") || "{}");
const initialState: BoardState = {
  value: boardData ? boardData : { id: uuidv4(), title: "New Board..." },
};
localStorage.setItem("board", JSON.stringify(initialState.value));

export const boardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setNewBoardState: (state: BoardState) => {
      state.value = { id: uuidv4(), title: "New Board..." };
      localStorage.setItem("board", JSON.stringify(state.value));
    },
    updateTitle: (state: BoardState, action: PayloadAction<string>) => {
      state.value = { ...state.value, title: action.payload };
      localStorage.setItem("board", JSON.stringify(state.value));
    },
  },
});

export const { setNewBoardState, updateTitle } = boardSlice.actions;
export default boardSlice.reducer;
