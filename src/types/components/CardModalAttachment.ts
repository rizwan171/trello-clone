import Attachment from "../global/Attachment";

export interface AttachmentFile {
  item: Attachment;
  file: string;
  color: string;
  isImage: boolean;
  fileExtension: string;
}