import localforage from "localforage";
import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { AiOutlinePaperClip } from "react-icons/ai";

const CardModalAttachment = ({card}) => {
    const [files, setFiles] = useState();

    useEffect(async()=> {
        let result = [];
        await Promise.all(card.attachments.map(async(id) => {
            let file = await localforage.getItem(id)
            result.push(file)
        }))
        setFiles(result)
    },[])   



  return (<>
    { card.attachments.length > 0 && 
        (<>
            <div className="flex items-center gap-2 text-lg mb-2 text-gray-800 font-semibold">
            <AiOutlinePaperClip size={20} />
            <p>Attachments</p>
            </div>
            {/* {files.length}
            { files.map(file => { 
                <div key = {file.id}>
                    {file.attachment.name}
                    {file.attachment.lastModifiedDate}
                    {file.attachment.size}
                </div>
            })} */}
        </>)
      }
      </>
  );
};

const getFiles = () => {

}

export default CardModalAttachment;
