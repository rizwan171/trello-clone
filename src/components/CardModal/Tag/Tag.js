import React from "react";
import { FiX } from "react-icons/fi";

const Tag = ({ name }) => {
  return (
    <div className="flex items-center gap-1 p-1 rounded-ibsm bg-blue-400">
      <p>{name}</p>
      <FiX className="cursor-pointer" />
    </div>
  );
};

export default Tag;
