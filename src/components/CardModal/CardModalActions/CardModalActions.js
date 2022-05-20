import React, { useState } from "react";
import { AiOutlineTag, AiOutlineDelete } from "react-icons/ai";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";
import CreateTagMenu from "../TagsMenu/CreateTagMenu/CreateTagMenu";
import TagsMenu from "../TagsMenu/TagsMenu";

const CardModalActions = () => {
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
    <div className="flex flex-col w-44 py-4 ml-auto">
      <h4 className="text-gray-800 text-sm">Add to card</h4>
      <button
        className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm"
        onClick={showTagsMenu}
      >
        <AiOutlineTag />
        <p>Tags</p>
      </button>
      {tagsMenuOpen && <TagsMenu closeTags={closeTags} showCreateTagForm={showCreateTagForm} />}
      {createTagOpen && <CreateTagMenu closeTags={closeTags} showTagsMenu={showTagsMenu} />}
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
