import localforage from "localforage";
import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeFileFromCard } from "../../../features/cardsSlice";
import { setCurrentSelectedCard } from "../../../features/currentSelectedCardSlice";
import { closeMenu } from "../../../features/modalActionMenusVisibilitySlice";

const AttachmentDeleteMenu = ({ id }) => {
  const card = useSelector((state) => state.currentSelectedCard.value);
  const dispatch = useDispatch();

  const handleDelete = () => {
    localforage.removeItem(id);
    dispatch(removeFileFromCard({ cardId: card.id, id }));
    dispatch(setCurrentSelectedCard({ ...card, attachments: card.attachments.filter((item) => item.fileId !== id) }));
    handleClose();
  };

  const handleClose = () => {
    dispatch(closeMenu());
  };

  return (
    // TODO change mt-32 to something more robust
    <div className="fixed mt-16 w-80 ml-24 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4">
      <div className="relative text-center mb-2">
        <span className="text-sm block relative z-10">Delete attachment?</span>
        <MdClose onClick={handleClose} size={20} className="absolute right-0 top-0 z-20 cursor-pointer" />
      </div>
      <hr />
      <div className="flex flex-col mt-2 text-sm">
        <span> Deleting an attachment is permanent. There is no undo.</span>
        <button
          className="p-2 mt-3 bg-red-600 hover:bg-red-800 text-white font-semibold items-center text-sm shadow-sm rounded-sm"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AttachmentDeleteMenu;
