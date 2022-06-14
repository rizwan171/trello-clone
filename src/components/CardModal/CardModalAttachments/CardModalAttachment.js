import localforage from "localforage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlinePaperClip } from "react-icons/ai";
import {
  showAttachmentDeleteMenu,
  showAttachmentEditMenu,
  showAttachmentMenu,
} from "../../../features/modalActionMenusVisibilitySlice";
import { useDispatch } from "react-redux";
import AttachmentDeleteMenu from "./AttachmentDeleteMenu";
import AttachmentEditMenu from "./AttachmentEditMenu";
import AttachmentMenu from "../CardModalActions/AttachmentMenu/AttachmentMenu";

const randomInt = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const arrColors = [
  "#aacaaa", // green
  "#6f8493",
  "#d4a096",
  "#bfa440",
  "#c7cf6c",
  "#aacaaa",
  "#b24b63",
  "#4d77e7",
  "#b55799",
  "#aacaaa",
  "#4ab6c2",
  "#aacaaa",
  "#cbb086",
  "#99d372",
  "#aacaaa",
];

const getRelativeDate = (date) => {
  const difference = Number(new Date()) - Number(new Date(JSON.parse(date)));
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  switch (true) {
    case difference < minute:
      return "Added less than a minute ago";
    case difference < hour:
      return `Added ${Math.round(difference / minute)} minutes ago`;
    case difference < day:
      return `Added ${Math.round(difference / hour)} hours ago`;
    case difference < month:
      return `Added ${Math.round(difference / day)} days ago`;
    case difference < year:
      return `Added ${Math.round(difference / month)} months ago`;
    case difference > year:
      return `Added ${Math.round(difference / year)} years ago`;
    default:
      return "";
  }
};

const getFileExtension = (file) => {
  const arr = file.split(".");
  return arr[arr.length - 1];
};

const CardModalAttachment = () => {
  const [files, setFiles] = useState([]);
  const card = useSelector((state) => state.currentSelectedCard.value);
  const attachmentMenuOpen = useSelector((state) => state.modalActionMenusVisibility.value.attachmentMenuOpen);
  const attachmentDeleteMenuOpen = useSelector((state) => state.modalActionMenusVisibility.value.attachmentDeleteMenuOpen);
  const attachmentEditMenuOpen = useSelector((state) => state.modalActionMenusVisibility.value.attachmentEditMenuOpen);

  const dispatch = useDispatch();

  useEffect(async () => {
    let result = [];
    await Promise.all(
      card.attachments.map(async (item) => {
        let file = await localforage.getItem(item.fileId);
        let url = URL.createObjectURL(file);
        let isImage = true;
        let fileExtension = getFileExtension(file.name);
        let color = arrColors[randomInt(0, arrColors.length)];
        if (fileExtension !== "png") {
          isImage = false;
          color = "rgb(229 231 235)";
        }
        // TODO: replace with dominant color - right now it is random
        result.push({ item, file: url, color, isImage, fileExtension });
      })
    );
    setFiles(result);
  }, [card]);

  const handleShowAttachmentDeleteModal = (id) => {
    dispatch(showAttachmentDeleteMenu({ id }));
  };

  const handleShowAttachmentEditModal = (id) => {
    dispatch(showAttachmentEditMenu({ id }));
  };

  const handleShowAttachmentMenuModal = (id) => {
    dispatch(showAttachmentMenu(id));
  };

  // TODO: Add formated date to date span
  return (
    <>
      {files.length > 0 && (
        <div className="flex-col">
          <div className="flex items-center gap-2 mt-2 text-lg mb-2 text-gray-800 font-semibold">
            <AiOutlinePaperClip size={20} />
            <p>Attachments</p>
          </div>
          {files.map((attachment) => (
            <div key={attachment.item.fileId} className=" flex mb-3  hover:bg-black hover:bg-opacity-5 rounded">
              <div className="flex items-center">
                <div
                  className="flex w-32 h-24 items-center justify-center rounded overflow-hidden"
                  style={{ backgroundColor: attachment.color }}
                >
                  <a className="max-w-32 max-h-24 rounded" download={attachment.item.name} href={attachment.file}>
                    {attachment.isImage ? (
                      <img className="max-w-32 max-h-24" src={attachment.file} />
                    ) : (
                      <span className="flex text-lg font-bold text-gray-600">{attachment.fileExtension}</span>
                    )}
                  </a>
                </div>
              </div>
              <div className="flex w-full flex-col text-gray-600 pl-3 rounded-ibs text-sm">
                <span className="font-bold break-all pt-1.5">{attachment.item.name}</span>
                <span className="break-words">
                  <span dt={attachment.item.date}>{getRelativeDate(attachment.item.date)} </span>
                  <span>
                    {" "}
                    - <span className="underline cursor-pointer">Comment</span>
                  </span>
                  <span>
                    {" "}
                    -{" "}
                    <span
                      className="underline cursor-pointer"
                      onClick={() => handleShowAttachmentDeleteModal(attachment.item.fileId)}
                    >
                      Delete
                    </span>
                  </span>
                  <span>
                    {" "}
                    -{" "}
                    <span
                      className="underline cursor-pointer"
                      onClick={() => handleShowAttachmentEditModal(attachment.item.fileId)}
                    >
                      Edit
                    </span>{" "}
                  </span>
                </span>
              </div>
              {attachmentDeleteMenuOpen.status && attachmentDeleteMenuOpen.id === attachment.item.fileId && (
                <AttachmentDeleteMenu id={attachment.item.fileId} />
              )}

              {attachmentEditMenuOpen.status && attachmentEditMenuOpen.id === attachment.item.fileId && (
                <AttachmentEditMenu id={attachment.item.fileId} name={attachment.item.name} />
              )}
            </div>
          ))}

          <button
            className="gap-2 py-1 px-2 mb-2 w-44  text-center bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm"
            onClick={() => handleShowAttachmentMenuModal(2)}
          >
            <p>Add an attachment</p>
          </button>
          {attachmentMenuOpen.status && attachmentMenuOpen.id === 2 && <AttachmentMenu update={true} />}
        </div>
      )}
    </>
  );
};

export default CardModalAttachment;
