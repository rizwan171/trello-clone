import Card from "../global/Card";

export default interface CurrentSelectedCardState {
  value: Card | null;
}

export type SetCurrentSelectedCardParams = Card;
