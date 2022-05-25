import React from "react";
import { useDispatch } from "react-redux";
import { AiOutlineTag, AiOutlineDelete } from "react-icons/ai";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";
import { useSelector } from "react-redux";
import { showTagsMenu } from "../../../features/tagsMenuVisibilitySlice";
import CreateTagMenu from "./TagsMenu/CreateTagMenu/CreateTagMenu";
import TagsMenu from "./TagsMenu/TagsMenu";

const CardModalActions = ({ card }) => {
  const dispatch = useDispatch();
  const tagsMenuOpen = useSelector((state) => state.tagsMenuVisibility.value.tagsMenuOpen);
  const createTagsMenuOpen = useSelector((state) => state.tagsMenuVisibility.value.createTagsMenuOpen);

  const handleShowTagsMenu = () => {
    dispatch(showTagsMenu());
  };

  return (
    <div className="flex flex-col w-44 py-4 ml-auto">
      <h4 className="text-gray-800 text-sm">Add to card</h4>
      <button
        className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm"
        onClick={handleShowTagsMenu}
      >
        <AiOutlineTag />
        <p>Tags</p>
      </button>
      {tagsMenuOpen && <TagsMenu card={card} />}
      {createTagsMenuOpen && <CreateTagMenu card={card} />}
      <h4 className="text-gray-800 text-sm">Actions</h4>
      <button className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm">
        <MdOutlineContentCopy />
        <p>Copy</p>
      </button>
      <button className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm">
        <HiOutlineArrowRight />
        <p>Move</p>
      </button>
      <button className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm">
        <AiOutlineDelete />
        <p>Delete</p>
      </button>
    </div>
  );
};

export default CardModalActions;
