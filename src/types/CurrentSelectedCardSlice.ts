import Card from "./Card";

export default interface CurrentSelectedCardState {
  value: Card | null;
}

export type SetCurrentSelectedCardParams = Card;
