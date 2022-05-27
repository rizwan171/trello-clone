import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    tagsMenuOpen: false,
    createTagsMenuOpen: false,
    copyMenuOpen: false,
  },
};

export const modalActionMenusVisibilitySlice = createSlice({
  name: "modalActionMenusVisibility",
  initialState,
  reducers: {
    closeMenu: (state) => {
      state.value = {
        ...initialState.value,
      };
    },
    showTagsMenu: (state) => {
      state.value = {
        ...initialState.value,
        tagsMenuOpen: true,
      };
    },
    showCreateTagMenu: (state) => {
      state.value = {
        ...initialState.value,
        createTagsMenuOpen: true,
      };
    },
    showCopyMenu: (state) => {
      state.value = {
        ...initialState.value,
        copyMenuOpen: true,
      };
    },
  },
});

export const { closeMenu, showTagsMenu, showCreateTagMenu, showCopyMenu } = modalActionMenusVisibilitySlice.actions;
export default modalActionMenusVisibilitySlice.reducer;