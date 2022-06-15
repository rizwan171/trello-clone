import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addTagToCard, removeTagFromCard } from "../../../../features/cardsSlice";
import { setCreateTagMenuData } from "../../../../features/createTagMenuDataSlice";
import { setCurrentSelectedCard } from "../../../../features/currentSelectedCardSlice";
import { closeMenu, showCreateTagMenu } from "../../../../features/modalActionMenusVisibilitySlice";
import TagOption from "./TagOption/TagOption";

const TagsMenu = ({ card }) => {
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
    dispatch(showCreateTagMenu());
  };

  const handleShowCreateTagForm = () => {
    dispatch(showCreateTagMenu());
  };

  const handleCloseTags = () => {
    dispatch(closeMenu());
  };

  const tagClicked = (tag) => {
    if (card.tags.includes(tag.id)) {
      dispatch(removeTagFromCard({ id: card.id, tagId: tag.id }));
      dispatch(setCurrentSelectedCard({ ...card, tags: [...card.tags.filter((tagId) => tagId !== tag.id)] }));
    } else {
      dispatch(addTagToCard({ id: card.id, tagId: tag.id }));
      dispatch(setCurrentSelectedCard({ ...card, tags: [...card.tags, tag.id] }));
    }
  };

  return (
    // TODO need to determine max height and then scroll tags
    <div className="fixed mt-10 w-72 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4">
      <div className="relative text-center mb-2">
        <span className="text-sm block relative z-10">Tags</span>
        <MdClose onClick={handleCloseTags} size={20} className="absolute right-0 top-0 z-20 cursor-pointer" />
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
          {tagsToShow.map((tag) => {
            const isSelected = card.tags.includes(tag.id);
            return <TagOption key={tag.id} tag={tag} isSelected={isSelected} editTag={handleEditTag} tagClicked={tagClicked} />;
          })}
        </div>
        <button
          onClick={handleShowCreateTagForm}
          className="p-2 mt-3 bg-trello-blue-100 hover:bg-trello-blue-200 text-white font-semibold items-center text-sm shadow-sm rounded-sm"
        >
          Create a new tag
        </button>
      </div>
    </div>
  );
};

export default TagsMenu;
