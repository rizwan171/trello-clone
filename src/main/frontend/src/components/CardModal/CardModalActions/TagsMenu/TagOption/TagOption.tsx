import { useEffect, useRef } from "react";
import { MdCheck, MdOutlineEdit } from "react-icons/md";
import { TagOptionProps } from "../../../../../types/components/TagOptionProps";

const TagOption = ({ tag, isSelected, editTag, tagClicked }: TagOptionProps) => {
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tagRef.current) {
      tagRef.current.style.background = tag.colour;
    }
  }, []);

  const handleEdit = () => {
    editTag(tag);
  };

  const handleClick = () => {
    tagClicked(tag);
  };

  return (
    <div className="flex h-8">
      <div data-testid="tag-option-inner-container" ref={tagRef} className="items-center flex text-white w-full rounded-ibsm cursor-pointer" onClick={handleClick}>
        <span data-testid="tag-option-name" className="ml-2">{tag.name}</span>
        {isSelected && <MdCheck data-testid="tag-selected-icon" size={20} className="ml-auto mr-2" />}
      </div>
      <MdOutlineEdit data-testid="edit-icon" className="self-center ml-2 cursor-pointer" size={20} onClick={handleEdit} />
    </div>
  );
};

export default TagOption;
