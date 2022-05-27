import React from "react";
import { useDispatch } from "react-redux";
import { AiOutlineTag, AiOutlineDelete } from "react-icons/ai";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";
import { useSelector } from "react-redux";
import { showCopyMenu, showMoveMenu, showTagsMenu } from "../../../features/modalActionMenusVisibilitySlice";
import CreateTagMenu from "./TagsMenu/CreateTagMenu/CreateTagMenu";
import TagsMenu from "./TagsMenu/TagsMenu";
import CopyMenu from "./CopyMenu/CopyMenu";
import MoveMenu from "./MoveMenu/MoveMenu";

const CardModalActions = ({ card }) => {
  const dispatch = useDispatch();
  const tagsMenuOpen = useSelector((state) => state.modalActionMenusVisibility.value.tagsMenuOpen);
  const createTagsMenuOpen = useSelector((state) => state.modalActionMenusVisibility.value.createTagsMenuOpen);
  const copyMenuOpen = useSelector((state) => state.modalActionMenusVisibility.value.copyMenuOpen);
  const moveMenuOpen = useSelector((state) => state.modalActionMenusVisibility.value.moveMenuOpen);

  const handleShowTagsMenu = () => {
    dispatch(showTagsMenu());
  };

  const handleShowCopyMenu = () => {
    dispatch(showCopyMenu());
  };

  const handleShowMoveMenu = () => {
    dispatch(showMoveMenu());
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
      <button
        className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm"
        onClick={handleShowCopyMenu}
      >
        <MdOutlineContentCopy />
        <p>Copy</p>
      </button>
      {copyMenuOpen && <CopyMenu />}
      <button
        className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm"
        onClick={handleShowMoveMenu}
      >
        <HiOutlineArrowRight />
        <p>Move</p>
      </button>
      {moveMenuOpen && <MoveMenu />}
      <button className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm">
        <AiOutlineDelete />
        <p>Delete</p>
      </button>
    </div>
  );
};

export default CardModalActions;
