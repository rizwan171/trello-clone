import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../../../../features/modalActionMenusVisibilitySlice";

const AttachmentMenu = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const hiddenFileInput = React.useRef(null);

  const handleFileSelect = (e) => {
      setSelectedFile(e.target.files);
      setIsFilePicked(true);
  }

  const dispatch = useDispatch();

  const card = useSelector((state) => state.currentSelectedCard.value);

  const handleClose = () => {
    dispatch(closeMenu());
  };

  const handleUpload = async() => {
    await hiddenFileInput.current.click();
    if (isFilePicked) { 
        console.log(selectedFile);
    } else {
        console.log('error')
    }
    // dispatch(
    //     addFileToCard (
    //         { 
    //             cardId: card.id, 
    //             upload: {}, 
    //         }
    //     )
    // );
    handleClose();
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
          onClick={handleUpload}
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
