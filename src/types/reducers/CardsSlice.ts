import Attachment from "../global/Attachment";
import Card from "../global/Card";

export type CardsState = {
  value: Card[];
}

export type AddCardParams = Omit<Card, "id">;

export interface UpdateCardTitleParams {
  cardId: string;
  title: string;
}

export type UpdateCardDescriptionParams = {
  cardId: string;
  description: string;
};

export type UpdateAllCardsParams = Card[];

export type DeleteCardParams = string;

export type DeleteAllListCardsParams = string;

export type CopyCardToListParams = {
  cardId: string;
  destListId: string;
}

export type CopyAllCardsToNewListParams = {
  sourceListId: string;
  destListId: string;
}

export type MoveCardToListParams = {
  cardId: string;
  destListId: string;
}

export type AddTagToCardParams = {
  cardId: string;
  tagId: string;
}

export type RemoveTagFromCardParams = {
  cardId: string;
  tagId: string;
}

export type RemoveTagFromAllCardsParams = string;

export type AddFilesToCardParams = {
  cardId: string;
  uploadedFiles: Attachment[];
}

export type RemoveFileFromCardParams = {
  cardId: string;
  fileId: string;
}

export type UpdateFileInCardParams = {
  cardId: string;
  fileId: string;
  fileName: string;
}
