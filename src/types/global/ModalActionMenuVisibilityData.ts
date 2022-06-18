export default interface ModalActionMenuVisibilityData {
  tagsMenuOpen: boolean;
  createTagsMenuOpen: boolean;
  copyMenuOpen: boolean;
  moveMenuOpen: boolean;
  deleteMenuOpen: boolean;
  attachmentMenuOpen: {
    status: boolean;
    id: number | string;
  };
  attachmentDeleteMenuOpen: {
    status: boolean;
    id: number | string;
  };
  attachmentEditMenuOpen: {
    status: boolean;
    id: number | string;
  };
}
