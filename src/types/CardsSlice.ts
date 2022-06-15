import Card from "./Card";

export interface CardsState {
  value: Card[];
}

export type AddCardParams = Omit<Card, "id">;
export type UpdateCardTitleParams = Pick<Card, "id" | "title">;
export type UpdateCardDescriptionParams = Pick<Card, "id" | "description">;
export type UpdateAllCardsParams = Card[];
export type DeleteCardParams = string;
export type DeleteAllListCardsParams = string;
export type CopyCardToListParams = Pick<Card, "id" | "listId">;
export type CopyAllCardsToNewListParams = {
  to: string;
  from: string;
};
export type MoveCardToListParams = Pick<Card, "id" | "listId">;
export type AddTagToCardParams = {
  id: string;
  tagId: string;
};
export type RemoveTagFromCardParams = {
  id: string;
  tagId: string;
};
