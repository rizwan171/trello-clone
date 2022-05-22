import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const tagsData = JSON.parse(localStorage.getItem("tags"));
const initialState = {
  value: tagsData ? tagsData : [],
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    createTag: (state, action) => {
      state.value.push({ ...action.payload, id: uuidv4() });
      localStorage.setItem("tags", JSON.stringify([...state.value]));
    },
    updateTag: (state, action) => {
      state.value.map((tag) => {
        if (tag.id === action.payload.id) {
          tag.name = action.payload.name;
          tag.colour = action.payload.colour;
        }

        return tag;
      });
      localStorage.setItem("tags", JSON.stringify([...state.value]));
    },
  },
});

export const { createTag, updateTag } = tagsSlice.actions;
export default tagsSlice.reducer;
