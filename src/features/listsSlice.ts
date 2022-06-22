import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import List from "../types/global/List";
import {
  ListsState,
  AddListParams,
  CopyListParams,
  EditTitleParams,
  RemoveListParams,
  UpdateAllListsParams,
} from "../types/reducers/ListsSlice";

const listData: List[] = JSON.parse(localStorage.getItem("lists") || "[]");

const initialState: ListsState = {
  value: listData ? listData : [],
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state: ListsState, action: PayloadAction<AddListParams>) => {
      state.value.push({ id: uuidv4(), title: action.payload });
      localStorage.setItem("lists", JSON.stringify([...state.value]));
    },
    editTitle: (state: ListsState, action: PayloadAction<EditTitleParams>) => {
      const listIndex = state.value.findIndex((list) => list.id === action.payload.id);
      if (listIndex !== -1) {
        state.value[listIndex].title = action.payload.title;
        localStorage.setItem("lists", JSON.stringify([...state.value]));
      }
    },
    removeList: (state: ListsState, action: PayloadAction<RemoveListParams>) => {
      state.value = state.value.filter((list) => list.id !== action.payload);
      localStorage.setItem("lists", JSON.stringify([...state.value]));
    },
    updateAllLists: (state: ListsState, action: PayloadAction<UpdateAllListsParams>) => {
      state.value = [...action.payload];
      localStorage.setItem("lists", JSON.stringify([...state.value]));
    },
    deleteAllLists: (state: ListsState) => {
      state.value = [];
      localStorage.setItem("lists", JSON.stringify([...state.value]));
    },
    copyList: (state: ListsState, action: PayloadAction<CopyListParams>) => {
      const list = state.value.find((list) => list.id === action.payload);
      if (list) {
        state.value.push({
          ...list,
          id: uuidv4(),
        });
        localStorage.setItem("lists", JSON.stringify([...state.value]));
      }
    },
  },
});

export const { addList, editTitle, removeList, updateAllLists, deleteAllLists, copyList } = listsSlice.actions;
export default listsSlice.reducer;
