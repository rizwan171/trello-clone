import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { copyCardToList } from "../../../../features/cardsSlice";
import { closeAllModalMenus } from "../../../../features/modalActionMenusVisibilitySlice";

const CopyMenu = () => {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => state.currentSelectedCard.value);
  const lists = useAppSelector((state) => state.lists.value);
  const [selectedListId, setSelectedListId] = useState("");

  const handleClose = () => {
    dispatch(closeAllModalMenus());
  };

  const handleCopyCard = () => {
    if (!card) return;

    dispatch(copyCardToList({ cardId: card.id, destListId: selectedListId }));
    handleClose();
  };

  return (
    <div className="fixed mt-10 w-72 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4">
      <div className="relative text-center mb-2">
        <span className="text-sm block relative z-10">Copy Card</span>
        <MdClose
          data-testid="close-icon"
          onClick={handleClose}
          size={20}
          className="absolute right-0 top-0 z-20 cursor-pointer"
        />
      </div>
      <hr />
      <div className="flex flex-col mt-2 text-sm">
        <span className="text-gray-600 my-2 font-semibold">Copy To...</span>
        <select
          name="lists"
          className="rounded-sm p-2 w-full max-w-full overflow-ellipsis"
          value={selectedListId}
          onChange={(e) => setSelectedListId(e.target.value)}
        >
          <option value="" disabled hidden>
            Select list
          </option>
          {lists.map((list) => (
            <option value={list.id} key={list.id}>
              {list.title}
            </option>
          ))}
        </select>
        <button
          onClick={handleCopyCard}
          className="p-2 mt-3 bg-trello-blue-100 hover:bg-trello-blue-200 text-white font-semibold items-center text-sm shadow-sm rounded-sm"
        >
          Copy Card
        </button>
      </div>
    </div>
  );
};

export default CopyMenu;
