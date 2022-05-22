import React, { useEffect, useRef } from "react";
import { MdCheck, MdOutlineEdit } from "react-icons/md";

// TODO isSelected would be used to show the check mark
const TagOption = ({ tag, isSelected, editTag, tagClicked }) => {
  const tagRef = useRef();

  useEffect(() => {
    tagRef.current.style.background = tag.colour;
  }, []);

  const handleEdit = () => {
    editTag(tag);
  };

  const handleClick = () => {
    tagClicked(tag);
  };

  return (
    <div onClick={handleClick} className="flex h-8">
      <div ref={tagRef} className="items-center flex text-white w-full rounded-ibsm cursor-pointer">
        <span className="ml-2">{tag.name}</span>
        {isSelected && <MdCheck size={20} className="ml-auto mr-2" />}
      </div>
      <MdOutlineEdit className="self-center ml-2 cursor-pointer" size={20} onClick={handleEdit} />
    </div>
  );
};

export default TagOption;
