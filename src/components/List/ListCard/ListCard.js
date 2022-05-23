import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSelectedCard } from "../../../features/currentSelectedCardSlice";
import ListCardTag from "./ListCardTag/ListCardTag";

const ListCard = ({ card, index }) => {
  const dispatch = useDispatch();
  const tagsToShow = useSelector((state) => state.tags.value).filter((tag) => card.tags.includes(tag.id));

  const openModal = () => {
    dispatch(setCurrentSelectedCard(card));
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} onClick={openModal}>
          <div className="flex flex-col shadow bg-white hover:bg-trello-gray-400 cursor-pointer rounded-md p-2 my-1.5 break-words">
            <p>{card.content}</p>
            {card.tags.length > 0 && (
              <div className="pt-2 text-xs flex flex-wrap gap-1">
                {tagsToShow.map((tag) => (
                  <ListCardTag key={tag.id} tag={tag} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

ListCard.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
};

export default ListCard;
