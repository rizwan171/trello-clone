import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    tagsMenuOpen: false,
    createTagsMenuOpen: false,
    copyMenuOpen: false,
    moveMenuOpen: false,
    deleteMenuOpen: false,
    attachmentMenuOpen: {
      status: false,
      id: 0,
    },
    attachmentDeleteMenuOpen: {
      status: false,
      id: 0,
    },
    attachmentEditMenuOpen: {
      status: false,
      id: 0,
    },
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
    showAttachmentMenu: (state, action) => {
      state.value = {
        ...initialState.value,
        attachmentMenuOpen: {
          status: true,
          id: action.payload,
        },
      };
    },
    showAttachmentDeleteMenu: (state, action) => {
      state.value = {
        ...initialState.value,
        attachmentDeleteMenuOpen: {
          status: true,
          id: action.payload.id,
        },
      };
    },
    showAttachmentEditMenu: (state, action) => {
      state.value = {
        ...initialState.value,
        attachmentEditMenuOpen: {
          status: true,
          id: action.payload.id,
        },
      };
    },
  },
});

export const {
  closeMenu,
  showTagsMenu,
  showCreateTagMenu,
  showCopyMenu,
  showMoveMenu,
  showDeleteMenu,
  showAttachmentMenu,
  showAttachmentDeleteMenu,
  showAttachmentEditMenu,
} = modalActionMenusVisibilitySlice.actions;
export default modalActionMenusVisibilitySlice.reducer;
