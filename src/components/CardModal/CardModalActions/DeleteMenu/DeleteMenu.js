import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from "../../../../features/cardsSlice";
import { clearSelectedCard } from "../../../../features/currentSelectedCardSlice";
import { closeMenu } from "../../../../features/modalActionMenusVisibilitySlice";

const DeleteMenu = () => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.currentSelectedCard.value);

  const handleClose = () => {
    dispatch(closeMenu());
  };

  const handleDeleteCard = () => {
    dispatch(deleteCard(card.id));
    dispatch(clearSelectedCard());
    handleClose();
  };

  return (
    <div className="fixed mt-40 w-72 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4">
      <div className="relative text-center mb-2">
        <span className="text-sm block relative z-10">Delete Card</span>
        <MdClose onClick={handleClose} size={20} className="absolute right-0 top-0 z-20 cursor-pointer" />
      </div>
      <hr />
      <div className="flex flex-col mt-2 text-sm">
        <button
          onClick={handleDeleteCard}
          className="p-2 mt-3 bg-red-600 hover:bg-red-800 text-white font-semibold items-center text-sm shadow-sm rounded-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteMenu;
