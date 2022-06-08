import localforage from "localforage";
import React, { useState, useRef } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeFileFromCard, updateFileInCard } from "../../../features/cardsSlice";
import { setCurrentSelectedCard } from "../../../features/currentSelectedCardSlice";
import { closeMenu } from "../../../features/modalActionMenusVisibilitySlice";

const AttachmentEditMenu = ({id, name}) => {
  const [fileName, setFileName] = useState(name);
  const card = useSelector((state) => state.currentSelectedCard.value);
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(updateFileInCard({ cardId: card.id, id, name: fileName}));
    const index = card.attachments.findIndex((item)=> item.fileId===id)
    let attachments = card.attachments.map(item=> {
        if (item.fileId === id) {
            return {fileId: id, date: item.date, name: fileName}
        }
        return item
    });
    if (index !== -1) {
    
        dispatch(setCurrentSelectedCard({...card, attachments}));    
    }

    handleClose();
  }

  const handleClose = () => {
    dispatch(closeMenu());
  };

  return (
    // TODO change mt-32 to something more robust
    <div className="fixed mt-16 w-80 ml-24 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4">
      <div className="relative text-center mb-2">
        <span className="text-sm block relative z-10">Edit attachment?</span>
        <MdClose onClick={handleClose} size={20} className="absolute right-0 top-0 z-20 cursor-pointer" />
      </div>
      <hr />
      <div className="flex flex-col mt-2 text-sm">
        <span className='font-medium pb-2'>Link name</span>

        <input
          type="text"
          autoFocus
          onChange={(e)=> setFileName(e.target.value.trim())}
          value = {fileName}
          className="w-full h-9 py-1 px-2 border-1 mb-2 border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100"
          placeholder="Change attachment name"
        />

        <button
          className="p-2 mt-2 w-32 bg-trello-blue-100 hover:bg-trello-blue-200 text-white font-semibold items-center text-sm shadow-sm rounded-sm"
          onClick={()=> handleEdit()}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default AttachmentEditMenu;
