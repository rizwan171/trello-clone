import Tag from "../global/Tag";

export type TagsState = {
  value: Tag[];
}

export type CreateTagParams = Omit<Tag, "id">;

export type UpdateTagParams = Tag;

export type DeleteTagParams = string;

export type UpdateAllTagsParams = Tag[];