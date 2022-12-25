import Tag from "../global/Tag";

export type TagOptionProps = {
  tag: Tag;
  isSelected: boolean;
  editTag: (tag: Tag) => void;
  tagClicked: (tag: Tag) => void;
}