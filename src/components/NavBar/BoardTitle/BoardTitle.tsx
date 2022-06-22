import { ChangeEvent, FocusEvent, KeyboardEvent, useState } from "react";
import PropTypes from "prop-types";
import { updateTitle } from "../../../features/boardSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const BoardTitle = () => {
  const dispatch = useAppDispatch();
  const boardData = useAppSelector((state) => state.board.value);
  const [selected, setSelected] = useState(false);
  const [editableTitle, setEditableTitle] = useState(boardData.title);
  const [width, setWidth] = useState(20);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(e.target.value);
    if (e.target.value.length >= 20) setWidth(e.target.value.length);
  };

  const handleOnBlur = () => {
    setSelected(false);
    setEditableTitle(boardData.title);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSelected(false);
      dispatch(updateTitle(editableTitle));
      setEditableTitle(editableTitle);
    }
  };

  const handleOnFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 20) setWidth(e.target.value.length);
  };

  return (
    <div className="flex h-14 items-center select-none text-3xl w-full">
      {selected ? (
        <input
          type="text"
          value={editableTitle}
          id="rounded-email"
          autoFocus
          size={width}
          onFocus={handleOnFocus}
          className="ml-2 py-1 text-trello-gray-300 font-semibold rounded-sm border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <h2 className="ml-2 my-auto text-trello-gray-300 font-semibold cursor-pointer" onClick={() => setSelected(true)}>
          {boardData.title}
        </h2>
      )}
    </div>
  );
};

BoardTitle.propTypes = {
  boardTitle: PropTypes.string,
};

export default BoardTitle;
