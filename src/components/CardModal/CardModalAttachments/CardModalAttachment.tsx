import localforage from "localforage";
import { useEffect, useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import {
  showAttachmentDeleteMenu,
  showAttachmentEditMenu,
  showAttachmentMenu,
} from "../../../features/modalActionMenusVisibilitySlice";
import AttachmentDeleteMenu from "./AttachmentDeleteMenu";
import AttachmentEditMenu from "./AttachmentEditMenu";
import AttachmentMenu from "../CardModalActions/AttachmentMenu/AttachmentMenu";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AttachmentFile } from "../../../types/components/CardModalAttachment";
import { ATTACHMENT_BG_COLOURS } from "../../../constants/AttachmentBackgroundColours";
import Card from "../../../types/global/Card";

const CardModalAttachment = () => {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => state.currentSelectedCard.value);
  const attachmentMenuOpen = useAppSelector((state) => state.modalActionMenusVisibility.value.attachmentMenuOpen);
  const attachmentDeleteMenuOpen = useAppSelector((state) => state.modalActionMenusVisibility.value.attachmentDeleteMenuOpen);
  const attachmentEditMenuOpen = useAppSelector((state) => state.modalActionMenusVisibility.value.attachmentEditMenuOpen);
  const [files, setFiles] = useState<AttachmentFile[]>([]);

  useEffect(() => {
    if (!card) return;

    getAttachments(card);
  }, [card]);

  const getAttachments = async (card: Card) => {
    const result: AttachmentFile[] = [];
    await Promise.all(
      card.attachments.map(async (item) => {
        const file: File | null = await localforage.getItem(item.id);
        if (file) {
          const url = URL.createObjectURL(file);
          const fileExtension = getFileExtension(file.name);
          let color = ATTACHMENT_BG_COLOURS[randomInt(0, ATTACHMENT_BG_COLOURS.length)];
          let isImage = true;
          if (fileExtension !== "png") {
            isImage = false;
            color = "rgb(229 231 235)";
          }
          // TODO: replace with dominant color - right now it is random
          result.push({ item, file: url, color, isImage, fileExtension });
        }
      })
    );

    setFiles(result);
  };

  const randomInt = (min: number, max: number) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRelativeDate = (date: string) => {
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

  const getFileExtension = (fileName: string) => {
    const arr = fileName.split(".");
    return arr[arr.length - 1];
  };

  const handleShowAttachmentDeleteModal = (id: string) => {
    dispatch(showAttachmentDeleteMenu(id));
  };

  const handleShowAttachmentEditModal = (id: string) => {
    dispatch(showAttachmentEditMenu(id));
  };

  const handleShowAttachmentMenuModal = (id: number) => {
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
            <div key={attachment.item.id} className=" flex mb-3  hover:bg-black hover:bg-opacity-5 rounded">
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
                  <span>{getRelativeDate(attachment.item.date)} </span>
                  <span>
                    {" "}
                    - <span className="underline cursor-pointer">Comment</span>
                  </span>
                  <span>
                    {" "}
                    -{" "}
                    <span
                      className="underline cursor-pointer"
                      onClick={() => handleShowAttachmentDeleteModal(attachment.item.id)}
                    >
                      Delete
                    </span>
                  </span>
                  <span>
                    {" "}
                    -{" "}
                    <span className="underline cursor-pointer" onClick={() => handleShowAttachmentEditModal(attachment.item.id)}>
                      Edit
                    </span>{" "}
                  </span>
                </span>
              </div>
              {attachmentDeleteMenuOpen.status && attachmentDeleteMenuOpen.id === attachment.item.id && (
                <AttachmentDeleteMenu fileId={attachment.item.id} />
              )}

              {attachmentEditMenuOpen.status && attachmentEditMenuOpen.id === attachment.item.id && (
                <AttachmentEditMenu fileId={attachment.item.id} fileName={attachment.item.name} />
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
