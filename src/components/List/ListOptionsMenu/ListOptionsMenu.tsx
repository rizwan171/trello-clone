import { useEffect, useRef, useState } from "react";
import { deleteAllListCards, copyAllCardsToNewList } from "../../../features/cardsSlice";
import { clearSelectedList } from "../../../features/currentSelectedListSlice";
import { removeList, copyList } from "../../../features/listsSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const ListOptionsMenu = () => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector((state) => state.lists.value);
  const currentSelectedList = useAppSelector((state) => state.currentSelectedList.value);
  const positionData = useAppSelector((state) => state.listOptionsMenuPosition.value);
  const [styles, setStyles] = useState({});
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStyles({ display: "none" });
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (currentSelectedList && ref.current && !ref.current.contains(e.target as Node)) {
        dispatch(clearSelectedList());
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [currentSelectedList]);

  useEffect(() => {
    if (positionData) {
      setStyles({
        top: positionData.top + 30,
        left: positionData.left,
      });
    }
  }, [positionData]);

  // copyAllCardsToNewList relies on the lists state in this component to be updated.
  // this state is updated on re-render/mounted (due to how redux works), hence
  // the use of the useEffect hook below
  useEffect(() => {
    if (done && currentSelectedList) {
      dispatch(copyAllCardsToNewList({ sourceListId: currentSelectedList.id, destListId: lists[lists.length - 1].id }));
      dispatch(clearSelectedList());
      setDone(false);
    }
  }, [done]);

  const handleCopy = () => {
    if (!currentSelectedList) return;

    dispatch(copyList(currentSelectedList.id));
    setDone(true);
  };

  const handleDelete = () => {
    if (!currentSelectedList) return;

    dispatch(deleteAllListCards(currentSelectedList.id));
    dispatch(removeList(currentSelectedList.id));
    dispatch(clearSelectedList());
  };

  return (
    // TODO add a transition for height when this is shown
    <div ref={ref} style={styles} className="flex flex-col rounded-sm shadow-xl w-24 text-center fixed bg-trello-gray-400">
      <button className="w-full p-2 cursor-pointer hover:bg-black hover:bg-opacity-20 rounded-md" onClick={handleCopy}>
        Copy
      </button>
      {/* TODO remove cursor not allowed when multiple boards have been implemented */}
      <button className="w-full p-2 cursor-not-allowed opacity-50 hover:bg-black hover:bg-opacity-20 rounded-md">Move</button>
      <button className="w-full p-2 cursor-pointer hover:bg-black hover:bg-opacity-20 rounded-md" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default ListOptionsMenu;
