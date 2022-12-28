import { ChangeEvent, useState } from "react";
import { MdClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { addTagToCard, removeTagFromCard } from "../../../../features/cardsSlice";
import { clearCreateTagMenuData, setCreateTagMenuData } from "../../../../features/createTagMenuDataSlice";
import { setCurrentSelectedCard } from "../../../../features/currentSelectedCardSlice";
import { closeAllModalMenus, showCreateTagMenu } from "../../../../features/modalActionMenusVisibilitySlice";
import Tag from "../../../../types/global/Tag";
import TagOption from "./TagOption/TagOption";

const TagsMenu = () => {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => state.currentSelectedCard.value);
  const tags = useAppSelector((state) => state.tags.value);
  const [tagsToShow, setTagsToShow] = useState([...tags]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase().trim();
    if (searchQuery.length === 0) {
      setTagsToShow([...tags]);
    } else {
      setTagsToShow(tags.filter((tag) => tag.name.toLowerCase().includes(searchQuery)));
    }
  };

  const handleEditTag = (tag: Tag) => {
    dispatch(setCreateTagMenuData(tag));
    dispatch(showCreateTagMenu());
  };

  const handleShowCreateTagForm = () => {
    dispatch(clearCreateTagMenuData());
    dispatch(showCreateTagMenu());
  };

  const handleCloseTags = () => {
    dispatch(closeAllModalMenus());
  };

  const tagClicked = (tag: Tag) => {
    if (!card) return;

    if (card.tags.includes(tag.id)) {
      dispatch(removeTagFromCard({ cardId: card.id, tagId: tag.id }));
      dispatch(setCurrentSelectedCard({ ...card, tags: [...card.tags.filter((tagId) => tagId !== tag.id)] }));
    } else {
      dispatch(addTagToCard({ cardId: card.id, tagId: tag.id }));
      dispatch(setCurrentSelectedCard({ ...card, tags: [...card.tags, tag.id] }));
    }
  };

  return (
    // TODO need to determine max height and then scroll tags
    <div className="fixed mt-10 w-72 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4">
      <div className="relative text-center mb-2">
        <span className="text-sm block relative z-10">Tags</span>
        <MdClose
          data-testid="close-tags-menu-icon"
          onClick={handleCloseTags}
          size={20}
          className="absolute right-0 top-0 z-20 cursor-pointer"
        />
      </div>
      <hr />
      <div className="flex flex-col mt-2 text-sm">
        <input
          data-testid="tag-search"
          type="text"
          autoFocus
          onChange={handleSearch}
          className="w-full h-9 py-1 px-2 border-1 mb-2 border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100"
          placeholder="Search tags..."
        />
        <span className="text-gray-600 my-2 font-semibold">Tags</span>
        <div className="flex flex-col w-full gap-1 font-bold">
          {tagsToShow.map((tag) => {
            if (!card) return;

            return (
              <TagOption
                key={tag.id}
                tag={tag}
                isSelected={card.tags.includes(tag.id)}
                editTag={handleEditTag}
                tagClicked={tagClicked}
              />
            );
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
