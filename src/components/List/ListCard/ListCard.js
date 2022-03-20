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
          <div className="flex flex-col shadow bg-white hover:bg-trello-gray-400 cursor-pointer rounded-md p-2 my-1.5 break-words">
            <p>{card.content}</p>
            <div className="pt-2 text-xs flex flex-wrap gap-1">
              <div className="bg-blue-500 rounded-md p-1">Tasdfasdfasdf 1</div>
              <div className="bg-yellow-500 rounded-md p-1">Tag 1</div>
              <div className="bg-green-200 rounded-md p-1">Tag 1</div>
              <div className="bg-indigo-700 rounded-md p-1">Tag 1</div>
              <div className="bg-blue-500 rounded-md p-1">Tag 1</div>
              <div className="bg-blue-500 rounded-md p-1">Tag 1</div>
              <div className="bg-blue-500 rounded-md p-1">Tag 1</div>
              <div className="bg-blue-500 rounded-md p-1">Tag 1</div>
              <div className="bg-blue-500 rounded-md p-1">Tag 1</div>
              <div className="bg-blue-500 rounded-md p-1">Tag 1</div>
              <div className="bg-blue-500 rounded-md p-1">Tag 1</div>
              <div className="bg-blue-500 rounded-md p-1">Tag 1</div>
              <div className="bg-blue-500 rounded-md p-1">Tag 1</div>
            </div>
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
