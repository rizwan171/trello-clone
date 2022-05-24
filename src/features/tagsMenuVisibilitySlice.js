import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    tagsMenuOpen: false,
    createTagsMenuOpen: false,
  },
};

export const tagsMenuVisibilitySlice = createSlice({
  name: "tagsMenuVisibility",
  initialState,
  reducers: {
    showTagsMenu: (state) => {
      state.value = {
        tagsMenuOpen: true,
        createTagsMenuOpen: false,
      };
    },
    closeTagsMenu: (state) => {
      state.value = {
        tagsMenuOpen: false,
        createTagsMenuOpen: false,
      };
    },
    showCreateTagMenu: (state) => {
      state.value = {
        tagsMenuOpen: false,
        createTagsMenuOpen: true,
      };
    },
  },
});

export const { showTagsMenu, closeTagsMenu, showCreateTagMenu } = tagsMenuVisibilitySlice.actions;
export default tagsMenuVisibilitySlice.reducer;
