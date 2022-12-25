import { useEffect, useRef, useState } from "react";
import { deleteAllListCards, copyAllCardsToNewList } from "../../../features/cardsSlice";
import { clearSelectedList } from "../../../features/currentSelectedListSlice";
import { removeList, copyList } from "../../../features/listsSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { MdClose } from "react-icons/md";

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

  const handleClose = () => {
    dispatch(clearSelectedList());
  };

  return (
    <div
      ref={ref}
      style={styles}
      className="fixed flex flex-col w-72 min-h-40 text-gray-700 bg-white rounded-ibsm shadow-2xl py-2"
    >
      <div className="relative text-center mb-2">
        <span className="mx-auto py-1">List Actions</span>
        <MdClose
          data-testid="list-options-menu-close-icon"
          onClick={handleClose}
          size={20}
          className="absolute right-0 top-0 z-20 cursor-pointer my-1 mr-3"
        />
      </div>
      <hr className="w-11/12 mx-auto" />
      <button className="w-full text-left px-3 py-2 cursor-pointer hover:bg-black hover:bg-opacity-10" onClick={handleCopy}>
        Copy list...
      </button>
      {/* TODO remove cursor not allowed when multiple boards have been implemented */}
      <button className="w-full text-left px-3 py-2 cursor-not-allowed opacity-50 hover:bg-black hover:bg-opacity-10">
        Move
      </button>
      <button className="w-full text-left px-3 py-2 cursor-pointer hover:bg-black hover:bg-opacity-10" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default ListOptionsMenu;
