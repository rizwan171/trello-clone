import Board from "./Board";
import Card from "./Card";
import List from "./List";

export default interface ImportData {
  board: Board,
  cards: Card[],
  lists: List[],
}