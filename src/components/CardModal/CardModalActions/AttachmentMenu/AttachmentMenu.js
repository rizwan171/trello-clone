import localforage from "localforage";
import React, { useState, useRef } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../../../../features/modalActionMenusVisibilitySlice";
import { v4 as uuidv4 } from "uuid";
import { addFileToCard } from "../../../../features/cardsSlice";

const AttachmentMenu = () => {
  const hiddenFileInput = useRef(null);

  const handleFileSelect = async(e) => {
      const files = e.target.files;
      let upload = []
      if (files) {
          for (let i= 0; i < files.length; i++) {
            let id = uuidv4();
            await localforage.setItem(id, files[i])
            upload.push(id);
            console.log("adding", await localforage.getItem(id));
          }
      }
      dispatch(
          addFileToCard (
              { 
                  cardId: card.id, 
                  upload, 
              }
          )
      );
      handleClose();
  }

  const dispatch = useDispatch();

  const card = useSelector((state) => state.currentSelectedCard.value);

  const handleClose = () => {
    dispatch(closeMenu());
  };





  return (
    // TODO change mt-32 to something more robust
    <div className="fixed mt-32 w-72 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4">
      <div className="relative text-center mb-2">
        <span className="text-sm block relative z-10">Attach From... </span>
        <MdClose onClick={handleClose} size={20} className="absolute right-0 top-0 z-20 cursor-pointer" />
      </div>
      <hr />
      <div className="flex flex-col mt-2 text-sm">
        <button
          onClick={() => hiddenFileInput.current.click()}
          className="p-2 mt-3 bg-trello-blue-100 hover:bg-trello-blue-200 text-white font-semibold items-center text-sm shadow-sm rounded-sm"
        >
          Upload from computer
        </button>
        <input multiple className='hidden' type='file' name='file' onChange = { handleFileSelect } ref = { hiddenFileInput } />

      </div>
    </div>
  );
};

export default AttachmentMenu;
