import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FiPlus, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addList } from "../../../features/listsSlice.js";

const AddList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [open]);

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddList = () => {
    setOpen(false);
    setTitle("");
    dispatch(addList({ title }));
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
  };

  return (
    <>
      <Collapse isOpen={open}>
        <div className="m-1 w-64">
          <input
            type="text"
            ref={inputRef}
            value={title}
            placeholder="Type something..."
            autoFocus
            className="w-full text-left box-border outline-none border-2 border-trello-blue-100 shadow bg-white hover:bg-trello-gray-400 rounded-md p-2 my-1.5"
            // onBlur={() => setOpen(false)}
            onChange={handleOnChange}
          />
          <div className="flex items-center">
            <button
              type="button"
              className="py-2 px-3 bg-trello-green-100 hover:bg-trello-green-200 text-white transition ease-in duration-200 text-center text-base shadow-md rounded-md"
              onClick={handleAddList}
            >
              Add List
            </button>
            <FiX
              onClick={handleClose}
              size={36}
              className="text-trello-gray-200 hover:bg-trello-gray-500 cursor-pointer rounded-full ml-1 p-1"
            />
          </div>
        </div>
      </Collapse>

      <Collapse isOpen={!open}>
        <div
          className="w-32 flex hover:bg-trello-gray-500 rounded-ibsm items-center cursor-pointer text-trello-gray-600 p-2 m-1"
          onClick={() => setOpen(true)}
        >
          <FiPlus size={20} />
          <h2 className="flex-1 ml-1.5">Add a list</h2>
        </div>
      </Collapse>
    </>
  );
};

export default AddList;

const Collapse = ({ isOpen, children }) => {
  const ref = useRef(null);
  const inlineStyle = isOpen ? { height: ref.current?.scrollHeight } : { height: 0, width: 0 };

  return (
    <div ref={ref} aria-hidden={!isOpen} style={inlineStyle} className="transition-height ease overflow-hidden duration-100">
      {children}
    </div>
  );
};

Collapse.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
