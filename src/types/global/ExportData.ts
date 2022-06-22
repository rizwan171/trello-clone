import Board from "./Board";
import Card from "./Card";
import List from "./List";

interface ExportData {
  board: Board;
  lists: List[];
  cards: Card[];
}

export type ExportDataFull = ExportData;

export interface ExportDataList {
  list: List;
  cards: Card[]
}
