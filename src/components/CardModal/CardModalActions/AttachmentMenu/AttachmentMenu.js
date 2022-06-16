import localforage from "localforage";
import React, { useState, useRef } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../../../../features/modalActionMenusVisibilitySlice";
import { v4 as uuidv4 } from "uuid";
import { addFilesToCard } from "../../../../features/cardsSlice";
import { setCurrentSelectedCard } from "../../../../features/currentSelectedCardSlice";

const AttachmentMenu = ({ update }) => {
  const hiddenFileInput = useRef(null);
  const dispatch = useDispatch();
  const card = useSelector((state) => state.currentSelectedCard.value);

  let style = "fixed mt-10 w-72 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4";
  if (update) style = "fixed w-72 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4";

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    let upload = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        let id = uuidv4();
        let date = JSON.stringify(new Date());
        await localforage.setItem(id, files[i]);
        upload.push({ fileId: id, date, name: files[i].name });
      }
    }

    dispatch(
      addFilesToCard({
        cardId: card.id,
        upload,
      })
    );
    dispatch(setCurrentSelectedCard({ ...card, attachments: [...card.attachments, ...upload] }));
    handleClose();
  };

  const handleClose = () => {
    dispatch(closeMenu());
  };

  return (
    <div className={style}>
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
        <input multiple className="hidden" type="file" name="file" onChange={handleFileSelect} ref={hiddenFileInput} />
      </div>
    </div>
  );
};

export default AttachmentMenu;
