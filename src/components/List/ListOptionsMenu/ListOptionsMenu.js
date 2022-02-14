import React from "react";

const ListOptionsMenu = () => {
  return (
    <div className="flex flex-col rounded-sm shadow-xl w-24 text-center fixed bg-trello-gray-400 top-80 left-36">
      <button className="w-full p-2 cursor-pointer hover:bg-black hover:bg-opacity-20 rounded-md">Copy</button>
      <button className="w-full p-2 cursor-pointer hover:bg-black hover:bg-opacity-20 rounded-md">Move</button>
      <button className="w-full p-2 cursor-pointer hover:bg-black hover:bg-opacity-20 rounded-md">Delete</button>
    </div>
  );
};

export default ListOptionsMenu;
