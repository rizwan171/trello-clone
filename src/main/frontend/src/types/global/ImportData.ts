import Board from "./Board";
import Card from "./Card";
import List from "./List";
import Tag from "./Tag";

export default interface ImportData {
  board: Board;
  cards: Card[];
  lists: List[];
  tags: Tag[];
}
