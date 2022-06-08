import localforage from "localforage";
import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { AiOutlinePaperClip } from "react-icons/ai";
import { showAttachmentDeleteMenu, showAttachmentEditMenu } from "../../../features/modalActionMenusVisibilitySlice";
import { useDispatch } from "react-redux";
import AttachmentDeleteMenu from "./AttachmentDeleteMenu";
import AttachmentEditMenu from "./AttachmentEditMenu";

const CardModalAttachment = () => {
    const [files, setFiles] = useState([]);
    const card = useSelector((state) => state.currentSelectedCard.value)
    const attachmentDeleteMenuOpen = useSelector((state) => state.modalActionMenusVisibility.value.attachmentDeleteMenuOpen);
    const attachmentEditMenuOpen = useSelector((state) => state.modalActionMenusVisibility.value.attachmentEditMenuOpen);

    const dispatch = useDispatch();
    useEffect(async()=> {
        let result = [];
        await Promise.all(card.attachments.map(async(item) => {
            let file = await localforage.getItem(item.fileId)
            result.push({item, file})
        }))
        setFiles(result);
    },[card])   

    const getRelativeDate = (date) => {
        const difference = Number(new Date()) - Number(new Date(JSON.parse(date)))
        const minute = 60 * 1000
        const hour = minute * 60
        const day = hour * 24
        const month = day * 30
        const year = day * 365
        
        switch (true) {
            case difference < minute:
                return 'Added less than a minute ago'
            case difference < hour:
                return `Added ${Math.round(difference/minute)} minutes ago`
            case difference < day:
                return `Added ${Math.round(difference/hour)} hours ago`
            case difference < month:
                return `Added ${Math.round(difference/day)} days ago`
            case difference < year:
                return `Added ${Math.round(difference/month)} months ago`
            case difference > year:
                return `Added ${Math.round(difference/year)} years ago`
            default:
                return ''
        }
    }

    const showAttachmentDeleteModal = (id) => {
        dispatch(showAttachmentDeleteMenu({id}));
    }

    const showAttachmentEditModal = (id) => {
        dispatch(showAttachmentEditMenu({id}));
    }


    const handleFileEdit = () => {
        // dispatch(showAttachmentDeleteMenu());
    }

  console.log("query", files)

  // TODO: Add formated date to date span
  return (<>
    { files.length > 0 && 
        (<>
            <div className="flex items-center gap-2 mt-2 text-lg mb-2 text-gray-800 font-semibold">
                <AiOutlinePaperClip size={20} />
                <p>Attachments</p>
            </div>
            { files.map( attachment =>
                <div key={attachment.item.fileId} className="flex">
                    <div className="flex w-full flex-col text-gray-600 p-2 mb-3  rounded-ibsm  hover:bg-black hover:bg-opacity-5 ">  
                        <span className="font-bold break-words">
                            {attachment.item.name}
                        </span>
                        <span className="break-words">
                            <span dt={ attachment.item.date}>{ getRelativeDate(attachment.item.date)} </span>
                            <span> - <span className="underline">Comment</span></span>
                            <span> - <span className="underline" onClick= {() => showAttachmentDeleteModal(attachment.item.fileId)}>Delete</span></span>
                            <span> - <span className="underline" onClick= {() => showAttachmentEditModal(attachment.item.fileId)}>Edit</span> </span>
                        </span>
                    </div>
                    { (attachmentDeleteMenuOpen.status && attachmentDeleteMenuOpen.id===attachment.item.fileId)
                        && <AttachmentDeleteMenu id={attachment.item.fileId}/>
                    }

                    { (attachmentEditMenuOpen.status && attachmentEditMenuOpen.id===attachment.item.fileId)
                        && <AttachmentEditMenu id={attachment.item.fileId} name={attachment.item.name}/>
                    }
                </div>
            )}

            <button
                className="gap-2 py-1 px-2 mb-2 w-44  text-center bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm"
            >
                <p>Add an attachment</p>
            </button>
        </>)
      }
      </>
  );
};

export default CardModalAttachment;
