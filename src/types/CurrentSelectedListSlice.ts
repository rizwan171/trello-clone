import List from "./List";

export default interface CurrentSelectedListState {
  value: List | null;
}

export type SetCurrentSelectedListParams = List;
