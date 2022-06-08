import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    tagsMenuOpen: false,
    createTagsMenuOpen: false,
    copyMenuOpen: false,
    moveMenuOpen: false,
    deleteMenuOpen: false,
    attachmentMenuOpen: false,
    attachmentDeleteMenuOpen: false,
    attachmentEditMenuOpen: false,
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
    showAttachmentMenu: (state) => {
      state.value = {
        ...initialState.value,
        attachmentMenuOpen: true,
      }
    },
    showAttachmentDeleteMenu: (state, action)=> {
      state.value = {
        ...initialState.value,
        attachmentDeleteMenuOpen: {
          status: true,
          id: action.payload.id
        }
      }
      console.log(action.payload.id)
    },
    showAttachmentEditMenu: (state, action)=> {
      state.value = {
        ...initialState.value,
        attachmentEditMenuOpen: {
          status: true,
          id: action.payload.id
        }
      }
      console.log(action.payload.id)
    }
  },
});

export const { closeMenu, showTagsMenu, showCreateTagMenu, showCopyMenu, showMoveMenu, showDeleteMenu, showAttachmentMenu, showAttachmentDeleteMenu, showAttachmentEditMenu } = modalActionMenusVisibilitySlice.actions;
export default modalActionMenusVisibilitySlice.reducer;
