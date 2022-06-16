import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSelectedCard } from "../../../features/currentSelectedCardSlice";
import ListCardTag from "./ListCardTag/ListCardTag";
import { NO_COLOUR } from "../../../constants/TagColours";
import { AiOutlinePaperClip } from "react-icons/ai";

const ListCard = ({ card, index }) => {
  const dispatch = useDispatch();
  const tagsToShow = useSelector((state) => state.tags.value).filter((tag) => card.tags.includes(tag.id) && tag.colour !== NO_COLOUR);

  const openModal = () => {
    dispatch(setCurrentSelectedCard(card));
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} onClick={openModal}>
          <div className="flex flex-col shadow bg-white hover:bg-trello-gray-400 cursor-pointer rounded-md p-2 my-1.5 break-words">
            <p>{card.title}</p>
            {card.tags.length > 0 && (
              <div className="pt-2 text-xs flex flex-wrap gap-1">
                {tagsToShow.map((tag) => (
                  <ListCardTag key={tag.id} tag={tag} />
                ))}
              </div>
            )}
            {card.attachments.length > 0 && (
            <div className="flex items-center text-gray-600 pt-2">
              <AiOutlinePaperClip/>
              <span className="text-xs pl-1">{ card.attachments.length}</span>  
            </div>)}
            
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
