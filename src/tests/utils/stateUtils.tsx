import { ModalActionMenuVisibilityState } from "../../types/reducers/ModalActionMenuVisibilitySlice";

export function generateModalActionsVisibilityState(): ModalActionMenuVisibilityState {
  return {
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
}
