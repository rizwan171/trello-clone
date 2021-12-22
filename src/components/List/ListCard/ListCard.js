import React from "react";

const ListCard = ({ card }) => {
  return (
    <div className="shadow bg-white hover:bg-trello-gray-400 cursor-pointer rounded-md p-2 my-1.5">
      { card.content }
    </div>
  );
}

export default ListCard;