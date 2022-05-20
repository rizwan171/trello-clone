import React from "react";
import { MdClose, MdArrowBack, MdClear } from "react-icons/md";
import TagColourOption from "./TagColourOption/TagColourOption";
import { NO_COLOUR, TAG_COLOURS } from "../../../../constants/TagColours.js";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTagColour } from "../../../../features/selectedTagColourSlice";

const CreateTagMenu = ({ closeTags, goBackToTagsMenu }) => {
  const dispatch = useDispatch();
  const selectedTagColour = useSelector((state) => state.selectedTagColour.value);

  const setNoColour = () => {
    dispatch(setSelectedTagColour(NO_COLOUR));
  };

  return (
    <div className="fixed w-72 min-h-40 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4 ">
      <div className="relative text-center mb-2">
        <span className="text-sm block relative z-10">New Tag</span>
        <MdArrowBack onClick={goBackToTagsMenu} size={20} className="absolute left-0 top-0 z-20 cursor-pointer" />
        <MdClose onClick={closeTags} size={20} className="absolute right-0 top-0 z-20 cursor-pointer" />
      </div>
      <hr />
      <div className="flex flex-col mt-2 text-sm">
        <span className="text-gray-600 my-2 font-semibold">Name</span>
        <input
          type="text"
          autoFocus
          className="w-full h-9 py-1 px-2 border-1 mb-2 border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100"
        />
        <span className="text-gray-600 my-2 font-semibold">Select a colour</span>
        <div className="grid grid-cols-5 gap-2">
          {TAG_COLOURS.map((colour, index) => (
            <TagColourOption key={index} colour={colour} />
          ))}
          <div
            className={
              "h-11 w-12 rounded-md bg-trello-gray-card-modal-buttons cursor-pointer" +
              (selectedTagColour == NO_COLOUR ? " ring-2 ring-trello-blue-100" : "")
            }
            onClick={setNoColour}
          >
            <div className="h-full w-full hover:bg-black hover:bg-opacity-20 rounded-md flex justify-center items-center">
              <MdClear size={20} />
            </div>
          </div>
          <div className="col-span-3 flex flex-col">
            <span className="text-gray-600">No Colour</span>
            <span className="text-gray-400">This won&apos;t show up on the front of cards</span>
          </div>
        </div>
        <button className="p-2 mt-3 bg-trello-blue-100 hover:bg-trello-blue-200 text-white font-semibold items-center text-sm shadow-sm rounded-sm">
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateTagMenu;
