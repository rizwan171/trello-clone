import React from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { showTagsMenu } from "../../../features/tagsMenuVisibilitySlice";

const AddTag = () => {
  const dispatch = useDispatch();

  const handleShowTagsMenu = () => {
    dispatch(showTagsMenu());
  };

  return (
    <div className="p-1 rounded-ibsm flex items-center cursor-pointer bg-black bg-opacity-5 hover:bg-opacity-10">
      <FiPlus className="mr-0.5 text-trello-gray-200" size={25} onClick={handleShowTagsMenu} />
    </div>
  );
};

export default AddTag;
