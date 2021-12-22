import React from "react";
import ListTitle from "../ListTitle/ListTitle.js";
import ListCard from "../ListCard/ListCard.js";
import AddCard from "../AddCard/AddCard.js";

const List = () => {
  return (
    <div className="shadow bg-trello-gray-100 rounded-md w-80 m-1 px-2 py-4 h-auto">
      <ListTitle />
      <div>
        <ListCard />
        <ListCard />
        <ListCard />
      </div>
      <AddCard />
    </div>
  )
}

export default List;