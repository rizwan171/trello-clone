import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCreateTagMenuData } from "../../../features/createTagMenuDataSlice";
import TagOption from "./TagOption/TagOption";

const TagsMenu = ({ closeTags, showCreateTagForm }) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.value);
  const [tagsToShow, setTagsToShow] = useState([...tags]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase().trim();
    if (searchQuery.length === 0) {
      setTagsToShow([...tags]);
    } else {
      setTagsToShow(tags.filter((tag) => tag.name.toLowerCase().includes(searchQuery)));
    }
  };

  const handleEditTag = (tag) => {
    dispatch(setCreateTagMenuData(tag));
    showCreateTagForm();
  };

  return (
    // TODO min-h-60 should be changed later to something more appropriate
    <div className="fixed w-72 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4 ">
      <div className="relative text-center mb-2">
        <span className="text-sm block relative z-10">Tags</span>
        <MdClose onClick={closeTags} size={20} className="absolute right-0 top-0 z-20 cursor-pointer" />
      </div>
      <hr />
      <div className="flex flex-col mt-2 text-sm">
        <input
          type="text"
          autoFocus
          onChange={handleSearch}
          className="w-full h-9 py-1 px-2 border-1 mb-2 border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100"
          placeholder="Search tags..."
        />
        <span className="text-gray-600 my-2 font-semibold">Tags</span>
        <div className="flex flex-col w-full gap-1 font-bold">
          {tagsToShow.map((tag) => (
            <TagOption key={tag.id} tag={tag} editTag={handleEditTag} />
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
