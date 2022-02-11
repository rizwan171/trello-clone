import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { setCurrentSelectedCard } from "../../../features/currentSelectedCardSlice";

const ListCard = ({ card, index }) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(setCurrentSelectedCard(card));
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} onClick={openModal}>
          <div className="shadow bg-white hover:bg-trello-gray-400 cursor-pointer rounded-md p-2 my-1.5">{card.content}</div>
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
