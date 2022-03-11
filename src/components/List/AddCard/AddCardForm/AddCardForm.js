import React from "react";
import { FiX } from "react-icons/fi";

const AddCardForm = ({ setOpen, setText }) => {
  const handleClose = () => {
    setOpen(false);
    // setText("");
  };

  return (
    <>
      <textarea
        // ref={inputRef}
        // value={text}
        placeholder="Type something..."
        autoFocus
        className="w-full box-border outline-none border-2 border-trello-blue-100 shadow bg-white hover:bg-trello-gray-400 rounded-md p-2 my-1.5"
        onBlur={() => setOpen(false)}
        // onChange={handleOnChange}
        // onKeyPress={handleKeyPress}
      />
      <div className="flex items-center">
        <button
          type="button"
          className="py-2 px-3 bg-trello-green-100 hover:bg-trello-green-200 text-white transition ease-in duration-200 text-center text-base shadow-md rounded-md"
          // onClick={handleAddCard}
        >
          Add Card
        </button>
        <FiX
          onClick={handleClose}
          size={36}
          className="text-trello-gray-200 hover:bg-trello-gray-500 cursor-pointer rounded-full ml-1 p-1"
        />
      </div>
    </>
  );
};

export default AddCardForm;
