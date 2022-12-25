import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { useAppDispatch } from "../../../../app/hooks";
import { addCard } from "../../../../features/cardsSlice";
import { AddCardFormProps } from "../../../../types/components/AddCardFormProps";

const AddCardForm = ({ setOpen, listId }: AddCardFormProps) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleClose = () => {
    setOpen(false);
    setText("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus();
      inputRef.current.setSelectionRange(0, 0);
    }
  }, []);

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value !== "\n") {
      setText(e.target.value);
    }
  };

  const handleAddCard = () => {
    if (text.trim().length !== 0) {
      dispatch(addCard({ listId, title: text, tags: [], description: "", attachments: [] }));
    }
    handleClose();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
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
    <div className="flex flex-col transition-height ease-in-out duration-200 h-min">
      <textarea
        data-testid="add-card-input"
        ref={inputRef}
        value={text}
        placeholder="Type something..."
        autoFocus
        className="resize-none w-full box-border outline-none shadow bg-white rounded-md p-2 my-1.5"
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <div className="flex items-center mt-1.5">
        <button
          type="button"
          className="py-2 px-3 bg-trello-green-100 hover:bg-trello-green-200 text-white transition ease-in duration-200 text-center text-base shadow-md rounded-md"
          onClick={handleAddCard}
        >
          Add Card
        </button>
        <FiX
          data-testid="add-card-close"
          onClick={handleClose}
          size={36}
          className="text-trello-gray-200 hover:bg-trello-gray-500 cursor-pointer rounded-full ml-1 p-1"
        />
      </div>
    </div>
  );
};

export default AddCardForm;
