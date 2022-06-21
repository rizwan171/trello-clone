import { ChangeEvent, FocusEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { editTitle } from "../../../features/listsSlice";
import { clearSelectedList, setCurrentSelectedList } from "../../../features/currentSelectedListSlice";
import { sendPositionData } from "../../../features/listOptionsMenuPositionSlice";
import ListTitleProps from "../../../types/components/ListTitleProps";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const ListTitle = ({ list }: ListTitleProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentSelectedList = useAppSelector((state) => state.currentSelectedList.value);
  const [selected, setSelected] = useState(false);
  const [editableTitle, setEditableTitle] = useState(list.title);
  const [rows, setRows] = useState(1);
  const moreMenuButtonRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [editableTitle]);

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditableTitle(e.target.value);
  };

  const handleOnBlur = () => {
    setSelected(false);
    setEditableTitle(list.title);
    setRows(1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setSelected(false);
      setRows(1);
      setEditableTitle(editableTitle);
      dispatch(editTitle({ id: list.id, title: editableTitle }));
    }
  };

  const handleMoreMenu = () => {
    if (!moreMenuButtonRef.current) {
      return;
    }

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

  const handleOnFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    // The scrollHeight is the height of all the content, including that which exceeds 1 row of textarea.
    // clientHeight is the height of the content the user can see at this point with 1 row of textarea.
    // To dynamically set the rows, we simply divide the scrollHeight by clientHeight and roundup
    setRows(Math.ceil(e.target.scrollHeight / e.target.clientHeight));
  };

  return (
    <div className="flex items-start select-none cursor-pointer p-1">
      {selected ? (
        <textarea
          ref={textAreaRef}
          typeof="text"
          value={editableTitle}
          id="rounded-email"
          autoFocus
          rows={rows}
          onFocus={handleOnFocus}
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

export default ListTitle;
