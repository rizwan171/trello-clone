import ModalActionMenuVisibilityData from "../global/ModalActionMenuVisibilityData";

export default interface ModalActionMenuVisibilityState {
  value: ModalActionMenuVisibilityData;
}

export type ShowAttachmentMenuParams = number | string;

export type ShowAttachmentDeleteMenuParams = number | string;

export type ShowAttachmentEditMenuParams = number | string;
