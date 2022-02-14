import React, { useState } from "react";
import PropTypes from "prop-types";
import { MdMoreHoriz } from "react-icons/md";
import { useDispatch } from "react-redux";
import { editTitle } from "../../../features/listsSlice.js";

const ListTitle = ({ list }) => {
  const [selected, setSelected] = useState(false);
  const [editableTitle, setEditableTitle] = useState(list.title);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setEditableTitle(e.target.value);
  };

  const handleOnBlur = () => {
    setSelected(false);
    setEditableTitle(list.title);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSelected(false);
      setEditableTitle(editableTitle);
      dispatch(editTitle({ newTitle: editableTitle, listId: list.id }));
    }
  };

  return (
    <div className="flex items-center select-none cursor-pointer">
      {selected ? (
        <input
          type="text"
          value={editableTitle}
          id="rounded-email"
          autoFocus
          className="text-trello-gray-300 font-semibold rounded-sm flex-1 border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <h2 className="flex-1 text-trello-gray-300 font-semibold" onClick={() => setSelected(true)}>
          {list.title}
        </h2>
      )}
      <div className="hover:bg-trello-gray-500 p-0.5 ml-1.5 rounded-ibsm">
        <MdMoreHoriz size={20} className="text-trello-gray-200" />
      </div>
    </div>
  );
};

// TODO update proptypes
ListTitle.propTypes = {
  listId: PropTypes.string,
  listTitle: PropTypes.string,
};

export default ListTitle;
