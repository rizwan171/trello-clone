import Attachment from "../global/Attachment";
import Card from "../global/Card";

export interface CardsState {
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

export interface CopyCardToListParams {
  cardId: string;
  destListId: string;
}

export interface CopyAllCardsToNewListParams {
  sourceListId: string;
  destListId: string;
}

export interface MoveCardToListParams {
  cardId: string;
  destListId: string;
}

export interface AddTagToCardParams {
  cardId: string;
  tagId: string;
}

export interface RemoveTagFromCardParams {
  cardId: string;
  tagId: string;
}

export type RemoveTagFromAllCardsParams = string;

export interface AddFilesToCardParams {
  cardId: string;
  uploadedFiles: Attachment[];
}

export interface RemoveFileFromCardParams {
  cardId: string;
  fileId: string;
}

export interface UpdateFileInCardParams {
  cardId: string;
  fileId: string;
  fileName: string;
}
