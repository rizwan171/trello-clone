import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addCard } from "../../../../features/cardsSlice";

const AddCardForm = ({ setOpen, open, listId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const inlineStyle = open ? { height: inputRef.current?.scrollHeight } : { height: 0, overflow: "hidden" };

  const handleClose = () => {
    setOpen(false);
    setText("");
  };

  useEffect(() => {
    if (open) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView();
    }
  }, [open]);

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleAddCard = () => {
    if (text.trim.length !== 0) {
      dispatch(addCard({ listId, content: text }));
      setOpen(false);
      setText("");
    }
  };

  const handleKeyDown = (e) => {
    switch (e.code) {
      case "Enter":
        handleAddCard();
        break;
      case "Escape":
        handleClose();
        break;
    }
  };

  return (
    <div className="flex flex-col transition-height ease-in-out duration-100" style={inlineStyle}>
      <textarea
        ref={inputRef}
        value={text}
        placeholder="Type something..."
        autoFocus
        className="w-full box-border outline-none border-2 border-trello-blue-100 shadow bg-white hover:bg-trello-gray-400 rounded-md p-2 my-1.5"
        onBlur={handleClose}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <div className="flex items-center">
        <button
          type="button"
          className="py-2 px-3 bg-trello-green-100 hover:bg-trello-green-200 text-white transition ease-in duration-200 text-center text-base shadow-md rounded-md"
          onClick={handleAddCard}
        >
          Add Card
        </button>
        <FiX
          onClick={handleClose}
          size={36}
          className="text-trello-gray-200 hover:bg-trello-gray-500 cursor-pointer rounded-full ml-1 p-1"
        />
      </div>
    </div>
  );
};

export default AddCardForm;