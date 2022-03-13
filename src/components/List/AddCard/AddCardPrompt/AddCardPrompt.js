import React, { useRef } from "react";
import { FiPlus } from "react-icons/fi";

const AddCardPrompt = ({ open, setOpen }) => {
  const ref = useRef();
  const inlineStyle = open ? { height: ref.current?.scrollHeight } : { height: 0, overflow: "hidden" };

  return (
    <div ref={ref} className="flex flex-col transition-height ease-in-out duration-100" style={inlineStyle}>
      <div
        className="flex hover:bg-trello-gray-500 rounded-ibsm items-center cursor-pointer text-trello-gray-600 p-1"
        onClick={() => setOpen(true)}
      >
        <FiPlus size={20} />
        <h2 className="flex-1 ml-1.5">Add a card</h2>
      </div>
    </div>
  );
};

export default AddCardPrompt;
