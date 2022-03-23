import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// const listData = JSON.parse(localStorage.getItem("tags")); TODO comment back in after

const initialState = {
  value: [
    {
      id: uuidv4(),
      name: "Tag 1",
    },
    {
      id: uuidv4(),
      name: "Tag 2",
    },
    {
      id: uuidv4(),
      name: "Tag 3",
    },
    {
      id: uuidv4(),
      name: "Tag 4",
    },
    {
      id: uuidv4(),
      name: "Tag 5",
    },
  ],
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    createTag: (state, action) => {
      state.value.push({ ...action.payload, id: uuidv4() });
      // localStorage.setItem("tags", JSON.stringify([...state.value])); TODO comment back in after
    },
  },
});

export const { createTag } = tagsSlice.actions;
export default tagsSlice.reducer;
