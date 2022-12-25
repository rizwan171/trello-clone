import Board from "./Board";
import Card from "./Card";
import List from "./List";
import Tag from "./Tag";

interface ExportData {
  board: Board;
  lists: List[];
  cards: Card[];
  tags: Tag[];
}

export type ExportDataFull = ExportData;

export interface ExportDataList {
  list: List;
  cards: Card[];
  tags: Tag[];
}
