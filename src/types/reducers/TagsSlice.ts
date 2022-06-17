import Tag from "../global/Tag";

export default interface TagsState {
  value: Tag[];
}

export type CreateTagParams = Omit<Tag, "id">;
export type UpdateTagParams = Tag;
