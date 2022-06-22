import Attachment from "../global/Attachment";

export type AttachmentFile = {
  item: Attachment;
  file: string;
  color: string;
  isImage: boolean;
  fileExtension: string;
}