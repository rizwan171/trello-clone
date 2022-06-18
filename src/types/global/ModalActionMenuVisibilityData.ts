export default interface ModalActionMenuVisibilityData {
  tagsMenuOpen: boolean;
  createTagsMenuOpen: boolean;
  copyMenuOpen: boolean;
  moveMenuOpen: boolean;
  deleteMenuOpen: boolean;
  attachmentMenuOpen: {
    status: boolean;
    id: number;
  };
  attachmentDeleteMenuOpen: {
    status: boolean;
    id: number;
  };
  attachmentEditMenuOpen: {
    status: boolean;
    id: number;
  };
}
