import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  value: [
    {
      id: uuidv4(),
      name: "Tag 1",
      colour: "#6EE7B7",
    },
    {
      id: uuidv4(),
      name: "Tag 2",
      colour: "#FCD34D",
    },
    {
      id: uuidv4(),
      name: "Tag 3",
      colour: "#F59E0B",
    },
    {
      id: uuidv4(),
      name: "Tag 4",
      colour: "#EF4444",
    },
    {
      id: uuidv4(),
      name: "Tag 5",
      colour: "#FCA5A5",
    },
  ],
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
