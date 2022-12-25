import Attachment from "./Attachment";

export default interface Card {
  id: string;
  listId: string;
  title: string;
  description: string;
  tags: string[];
  attachments: Attachment[];
}
