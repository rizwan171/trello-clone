import React from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

const CopyMenu = () => {
  const lists = useSelector((state) => state.lists.value);

  const handleClose = () => {};

  const handleCopyCard = () => {};

  return (
    <div className="fixed mt-16 w-72 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4">
      <div className="relative text-center mb-2">
        <span className="text-sm block relative z-10">Copy Card</span>
        <MdClose onClick={handleClose} size={20} className="absolute right-0 top-0 z-20 cursor-pointer" />
      </div>
      <hr />
      <div className="flex flex-col mt-2 text-sm">
        <span className="text-gray-600 my-2 font-semibold">Copy To...</span>
        <div>
          <label htmlFor="lists absolute top-0 left-3">List</label>
          <select name="lists" className="rounded-sm p-2">
            {lists.map((list) => (
              <option value={list.id} key={list.id}>
                {list.title}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleCopyCard}
          className="p-2 mt-3 bg-trello-blue-100 hover:bg-trello-blue-200 text-white font-semibold items-center text-sm shadow-sm rounded-sm"
        >
          Copy Card
        </button>
      </div>
    </div>
  );
};

export default CopyMenu;
