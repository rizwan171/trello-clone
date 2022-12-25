import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { addList } from "../../../features/listsSlice";
import { useAppDispatch } from "../../../app/hooks";
import Collapse from "../../Collapse/Collapse";

const AddList = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [open]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddList();
    }
  };

  const handleAddList = () => {
    setOpen(false);
    setTitle("");
    dispatch(addList(title));
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
  };

  return (
    <div className={open ? "shadow bg-trello-gray-100 rounded-md w-80 m-1 px-2 py-2 flex flex-col list-wrapper" : ""}>
      {open ? (
        <Collapse isOpen={open} className={open ? "h-full" : ""}>
          <div>
            <input
              data-testid="add-list-title-input"
              type="text"
              ref={inputRef}
              value={title}
              placeholder="Type something..."
              autoFocus
              className="w-full text-left box-border outline-none border-2 border-trello-blue-100 shadow bg-white hover:bg-trello-gray-400 rounded-md p-2"
              // onBlur={() => setOpen(false)}
              onChange={handleOnChange}
              onKeyPress={handleKeyPress}
            />
            <div className="flex items-center mt-2">
              <button
                type="button"
                className="py-2 px-3 bg-trello-green-100 hover:bg-trello-green-200 text-white transition ease-in duration-200 text-center text-base shadow-md rounded-md"
                onClick={handleAddList}
              >
                Add List
              </button>
              <FiX
                data-testid="add-list-close-icon"
                onClick={handleClose}
                size={36}
                className="text-trello-gray-200 hover:bg-trello-gray-500 cursor-pointer rounded-full ml-1 p-1"
              />
            </div>
          </div>
        </Collapse>
      ) : (
        <Collapse isOpen={!open}>
          <div
            className="w-32 flex hover:bg-trello-gray-500 rounded-ibsm items-center cursor-pointer text-trello-gray-600 p-2 m-1"
            onClick={() => setOpen(true)}
          >
            <FiPlus size={20} />
            <h2 className="flex-1">Add a list</h2>
          </div>
        </Collapse>
      )}
    </div>
  );
};

export default AddList;
