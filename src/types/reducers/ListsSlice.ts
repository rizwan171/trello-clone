import List from "../global/List";

export default interface ListsState {
  value: List[];
}

export type AddListParams = string;

export type EditTitleParams = List;

export type RemoveListParams = string;

export type UpdateAllListsParams = List[];

export type CopyListParams = string;
