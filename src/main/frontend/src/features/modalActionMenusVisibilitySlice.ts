import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ModalActionMenuVisibilityState,
  ShowAttachmentDeleteMenuParams,
  ShowAttachmentEditMenuParams,
  ShowAttachmentMenuParams,
} from "../types/reducers/ModalActionMenuVisibilitySlice";

const initialState: ModalActionMenuVisibilityState = {
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
    closeAllModalMenus: (state: ModalActionMenuVisibilityState) => {
      state.value = {
        ...initialState.value,
      };
    },
    showTagsMenu: (state: ModalActionMenuVisibilityState) => {
      state.value = {
        ...initialState.value,
        tagsMenuOpen: true,
      };
    },
    showCreateTagMenu: (state: ModalActionMenuVisibilityState) => {
      state.value = {
        ...initialState.value,
        createTagsMenuOpen: true,
      };
    },
    showCopyMenu: (state: ModalActionMenuVisibilityState) => {
      state.value = {
        ...initialState.value,
        copyMenuOpen: true,
      };
    },
    showMoveMenu: (state: ModalActionMenuVisibilityState) => {
      state.value = {
        ...initialState.value,
        moveMenuOpen: true,
      };
    },
    showDeleteMenu: (state: ModalActionMenuVisibilityState) => {
      state.value = {
        ...initialState.value,
        deleteMenuOpen: true,
      };
    },
    showAttachmentMenu: (state: ModalActionMenuVisibilityState, action: PayloadAction<ShowAttachmentMenuParams>) => {
      state.value = {
        ...initialState.value,
        attachmentMenuOpen: {
          status: true,
          id: action.payload,
        },
      };
    },
    showAttachmentDeleteMenu: (state: ModalActionMenuVisibilityState, action: PayloadAction<ShowAttachmentDeleteMenuParams>) => {
      state.value = {
        ...initialState.value,
        attachmentDeleteMenuOpen: {
          status: true,
          id: action.payload,
        },
      };
    },
    showAttachmentEditMenu: (state: ModalActionMenuVisibilityState, action: PayloadAction<ShowAttachmentEditMenuParams>) => {
      state.value = {
        ...initialState.value,
        attachmentEditMenuOpen: {
          status: true,
          id: action.payload,
        },
      };
    },
  },
});

export const {
  closeAllModalMenus,
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
