import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { MdMoreHoriz } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { editTitle } from "../../../features/listsSlice.js";
import { clearSelectedList, setCurrentSelectedList } from "../../../features/currentSelectedListSlice.js";
import { sendPositionData } from "../../../features/listOptionsMenuPositionSlice.js";

const ListTitle = ({ list }) => {
  const [selected, setSelected] = useState(false);
  const [editableTitle, setEditableTitle] = useState(list.title);
  const [rows, setRows] = useState(1);

  const dispatch = useDispatch();
  const currentSelectedList = useSelector((state) => state.currentSelectedList.value);
  const moreMenuButtonRef = useRef();
  const ref = useRef();


  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.height = "0px";
      const scrollHeight = ref.current.scrollHeight;
      ref.current.style.height = scrollHeight + "px";
    }
  }, [editableTitle]);


  const handleOnChange = (e) => {
    setEditableTitle(e.target.value);
  };

  const handleOnBlur = () => {
    setSelected(false);
    setEditableTitle(list.title);
    setRows(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSelected(false);
      setRows(1);
      setEditableTitle(editableTitle);
      dispatch(editTitle({ newTitle: editableTitle, listId: list.id }));
    }
  };

  const handleMoreMenu = () => {
    if (!currentSelectedList) {
      dispatch(sendPositionData({ top: moreMenuButtonRef.current.offsetTop, left: moreMenuButtonRef.current.offsetLeft }));
      dispatch(setCurrentSelectedList(list));
    } else {
      dispatch(clearSelectedList());
      if (currentSelectedList.id !== list.id) {
        dispatch(sendPositionData({ top: moreMenuButtonRef.current.offsetTop, left: moreMenuButtonRef.current.offsetLeft }));
        dispatch(setCurrentSelectedList(list));
      }
    }
  };

  const handleOnFocus = (e) => {
    // The scrollHeight is the height of all the content, including that which exceeds 1 row of textarea.
    // clientHeight is the height of the content the user can see at this point with 1 row of textarea.
    // To dynamically set the rows, we simply divide the scrollHeight by clientHeight and roundup
    setRows(Math.ceil(e.target.scrollHeight / e.target.clientHeight));
  };


  return (
    <div className="flex items-start select-none cursor-pointer pb-2">
      {selected ? (
        <textarea
          ref = {ref}
          type="text"
          value={editableTitle}
          id="rounded-email"
          autoFocus
          rows={rows}
          onFocus = {handleOnFocus}
          className="w-full scroll-y-hidden px-1 text-trello-gray-300 font-semibold rounded-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <h2 className="flex-1 px-1 text-trello-gray-300 font-semibold break-all" onClick={() => setSelected(true)}>
          {list.title}
        </h2>
      )}
      <div ref={moreMenuButtonRef} className="hover:bg-trello-gray-500 p-0.5 ml-1.5 rounded-ibsm" onClick={handleMoreMenu}>
        <MdMoreHoriz size={20} className="text-trello-gray-200" />
      </div>
    </div>
  );
};

ListTitle.propTypes = {
  list: PropTypes.object
};

export default ListTitle;
