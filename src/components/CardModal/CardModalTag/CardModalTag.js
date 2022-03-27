import React from "react";
import { FiX } from "react-icons/fi";

const CardModalTag = ({ name }) => {
  return (
    <div className="flex items-center gap-1 py-1 px-2 rounded-sm bg-blue-600 font-semibold text-white">
      <p>{name}</p>
      {/* <FiX className="cursor-pointer" /> */}
    </div>
  );
};

export default CardModalTag;
