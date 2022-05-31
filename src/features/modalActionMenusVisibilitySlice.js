import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    tagsMenuOpen: false,
    createTagsMenuOpen: false,
    copyMenuOpen: false,
    moveMenuOpen: false,
    deleteMenuOpen: false,
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
    showMoveMenu: (state) => {
      state.value = {
        ...initialState.value,
        moveMenuOpen: true,
      };
    },
    showDeleteMenu: (state) => {
      state.value = {
        ...initialState.value,
        deleteMenuOpen: true,
      };
    },
  },
});

export const { closeMenu, showTagsMenu, showCreateTagMenu, showCopyMenu, showMoveMenu, showDeleteMenu } = modalActionMenusVisibilitySlice.actions;
export default modalActionMenusVisibilitySlice.reducer;
