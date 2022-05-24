import React, { useRef, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { createTag } from "../../../features/tagsSlice";
import CreateTagMenu from "../TagsMenu/CreateTagMenu/CreateTagMenu";
import TagsMenu from "../TagsMenu/TagsMenu";

const AddTag = ({ card }) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.value);
  const [tagsMenuOpen, setTagsMenuOpen] = useState(false);
  const [createTagOpen, setCreateTagOpen] = useState(false);

  const closeTags = () => {
    setTagsMenuOpen(false);
    setCreateTagOpen(false);
  };

  const showTagsMenu = () => {
    setTagsMenuOpen(true);
    setCreateTagOpen(false);
  };

  const showCreateTagForm = () => {
    setCreateTagOpen(true);
    setTagsMenuOpen(false);
  };

  return (
    <div className="p-1 rounded-ibsm flex items-center cursor-pointer bg-black bg-opacity-5 hover:bg-opacity-10">
      <FiPlus className="mr-0.5 text-trello-gray-200" size={25} onClick={showTagsMenu} />
      {tagsMenuOpen && <TagsMenu card={card} closeTags={closeTags} showCreateTagForm={showCreateTagForm} />}
      {createTagOpen && <CreateTagMenu card={card} closeTags={closeTags} showTagsMenu={showTagsMenu} />}
    </div>
  );
};

export default AddTag;
