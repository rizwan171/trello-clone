import { UpdateAllTagsParams } from "./../types/reducers/TagsSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import Tag from "../types/global/Tag";
import { TagsState, CreateTagParams, DeleteTagParams, UpdateTagParams } from "../types/reducers/TagsSlice";

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
    deleteTag: (state: TagsState, action: PayloadAction<DeleteTagParams>) => {
      state.value = state.value.filter((tag) => tag.id !== action.payload);
      localStorage.setItem("tags", JSON.stringify([...state.value]));
    },
    updateAllTags: (state: TagsState, action: PayloadAction<UpdateAllTagsParams>) => {
      state.value = [...action.payload];
      localStorage.setItem("tags", JSON.stringify([...state.value]));
    },
  },
});

export const { createTag, updateTag, deleteTag, updateAllTags } = tagsSlice.actions;
export default tagsSlice.reducer;
