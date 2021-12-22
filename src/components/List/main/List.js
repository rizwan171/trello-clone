import React from "react";
import ListTitle from "../ListTitle/ListTitle.js";
import ListCard from "../ListCard/ListCard.js";
import AddCard from "../AddCard/AddCard.js";

const List = ({ list }) => {
  return (
    <div className="shadow bg-trello-gray-100 rounded-md w-80 m-1 px-2 py-4 h-auto">
      <ListTitle titleText={list.title} />
      <div>
        { list.cards.map(card => <ListCard key={card.id} card={card}/>) }
      </div>
      <AddCard />
    </div>
  )
}

export default List;