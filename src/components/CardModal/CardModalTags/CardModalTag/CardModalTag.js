import React from "react";

const CardModalTag = ({ name }) => {
  return (
    <div className="flex items-center gap-1 py-1 px-2 rounded-sm bg-blue-600 font-semibold text-white">
      <p>{name}</p>
    </div>
  );
};

export default CardModalTag;