import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import Tag from "../types/global/Tag";
import TagsState, { CreateTagParams, UpdateTagParams } from "../types/reducers/TagsSlice";

const tagsData: Tag[] = JSON.parse(localStorage.getItem("tags") || "[]");
const initialState: TagsState = {
  value: tagsData ? tagsData : [],
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    createTag: (state: TagsState, action: PayloadAction<CreateTagParams>) => {
      state.value.push({ ...action.payload, id: uuidv4() });
      localStorage.setItem("tags", JSON.stringify([...state.value]));
    },
    updateTag: (state: TagsState, action: PayloadAction<UpdateTagParams>) => {
      state.value.map((tag) => {
        if (tag.id === action.payload.id) {
          tag.name = action.payload.name;
          tag.colour = action.payload.colour;
        }

        return tag;
      });
      localStorage.setItem("tags", JSON.stringify([...state.value]));
    },
    deleteTag: (state, action) => {
      state.value = state.value.filter((tag) => 
        tag.id !== action.payload
      );
      localStorage.setItem("tags", JSON.stringify([...state.value]));
    },
  },
});

export const { createTag, updateTag, deleteTag } = tagsSlice.actions;
export default tagsSlice.reducer;
