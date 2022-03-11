import React from "react";
import { FiPlus } from "react-icons/fi";

const AddCardPrompt = ({ setOpen }) => {
  return (
    <div
      className="flex hover:bg-trello-gray-500 rounded-ibsm items-center cursor-pointer text-trello-gray-600 p-1"
      onClick={() => setOpen(true)}
    >
      <FiPlus size={20} />
      <h2 className="flex-1 ml-1.5">Add a card</h2>
    </div>
  );
};

export default AddCardPrompt;
