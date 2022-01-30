import React from "react";
import { AiOutlinePicture, AiOutlineSave } from "react-icons/ai";

const ImageUploadOptions = () => {
  return (
    <div className="flex flex-col">
      <div className="border-dashed border-3 border-trello-blue-100 h-38 flex flex-col items-center justify-center cursor-pointer">
        <AiOutlinePicture size={75} className="text-gray-600" />
        <p className="text-xs text-gray-600">Click here to Upload a picture</p>
      </div>
      <button className="flex justify-center items-center py-2 px-3 mt-2 bg-trello-blue-100 hover:bg-trello-blue-200 text-white text-base shadow-md rounded-md">
        <AiOutlineSave size={23} className="mr-2" />
        Save as Background
      </button>
    </div>
  );
};

export default ImageUploadOptions;
