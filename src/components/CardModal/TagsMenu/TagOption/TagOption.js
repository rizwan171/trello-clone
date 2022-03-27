import React from "react";
import { MdCheck, MdOutlineEdit } from "react-icons/md";

// TODO isSelected would be used to show the check mark
const TagOption = ({ name, isSelected }) => {
  return (
    <div className="flex h-8">
      <div className="items-center flex bg-green-400 text-white w-full rounded-ibsm">
        <span className="ml-2">{name}</span>
        <MdCheck size={20} className="ml-auto mr-2" />
      </div>
      <MdOutlineEdit className="self-center ml-2" size={20} />
    </div>
  );
};

export default TagOption;
