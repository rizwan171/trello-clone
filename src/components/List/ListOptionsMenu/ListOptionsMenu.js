import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteAllListCards } from "../../../features/cardsSlice";
import { clearSelectedList } from "../../../features/currentSelectedListSlice";
import { removeList } from "../../../features/listsSlice";

const ListOptionsMenu = ({ list }) => {
  const dispatch = useDispatch();
  const positionData = useSelector((state) => state.listOptionsMenuPosition.value);
  const [styles, setStyles] = useState({});

  useEffect(() => {
    if (positionData) {
      setStyles({
        top: positionData.top,
        left: positionData.left,
      });
      // menuRef.current.offsetTop = positionData.top;
      // menuRef.current.offsetLeft = positionData.left;
    }
  }, [positionData]);

  const handleDelete = () => {
    dispatch(deleteAllListCards(list.id));
    dispatch(removeList(list.id));
    dispatch(clearSelectedList());
  };

  return (
    // TODO add a transition for height when this is shown
    <div style={styles} className="flex flex-col rounded-sm shadow-xl w-24 text-center fixed bg-trello-gray-400">
      <button className="w-full p-2 cursor-pointer hover:bg-black hover:bg-opacity-20 rounded-md">Copy</button>
      <button className="w-full p-2 cursor-pointer hover:bg-black hover:bg-opacity-20 rounded-md">Move</button>
      <button className="w-full p-2 cursor-pointer hover:bg-black hover:bg-opacity-20 rounded-md" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default ListOptionsMenu;
