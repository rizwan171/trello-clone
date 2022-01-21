import React from "react";
import { Draggable } from "react-beautiful-dnd";

const ListCard = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          <div className="shadow bg-white hover:bg-trello-gray-400 cursor-pointer rounded-md p-2 my-1.5">
            {card.content}
          </div>
        </div>
      )}

    </Draggable>
  );
}

export default ListCard;