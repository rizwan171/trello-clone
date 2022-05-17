import React from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import TagOption from "./TagOption/TagOption";

const TagsMenu = ({ closeTags, showCreateTagForm }) => {
  const tags = useSelector((state) => state.tags.value);

  return (
    // TODO min-h-60 should be changed later to something more appropriate
    <div className="fixed w-72 min-h-60 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4 ">
      <div className="relative text-center mb-2">
        <span className="text-sm block relative z-10">Tags</span>
        <MdClose onClick={closeTags} size={20} className="absolute right-0 top-0 z-20 cursor-pointer" />
      </div>
      <hr />
      <div className="flex flex-col mt-2 text-sm">
        <input
          type="text"
          autoFocus
          className="w-full h-9 py-1 px-2 border-1 mb-2 border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100"
          placeholder="Search tags..."
        />
        <span className="text-gray-600 my-2 font-semibold">Tags</span>
        <div className="flex flex-col w-full gap-1 font-bold">
          {tags.map((tag) => (
            <TagOption key={tag.id} name={tag.name} />
          ))}
        </div>
        <button
          onClick={showCreateTagForm}
          className="py-1.5 px-2 mt-3 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-sm shadow-sm rounded-sm"
        >
          Create a new tag
        </button>
      </div>
    </div>
  );
};

export default TagsMenu;
