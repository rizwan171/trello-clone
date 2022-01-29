import React from 'react';
import { BiCog } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { toggleBoardVisiblity } from '../../../features/boardOptionSlice.js'

const BoardOptions = () => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    console.log("click");
    dispatch(toggleBoardVisiblity());
  }

  return (
    <div className='my-auto'>
      <button type="button" className="flex items-center px-3 py-2 text-lg w-32 text-trello-gray-200 bg-trello-gray-500 bg-opacity-50 bg-transparent hover:bg-opacity-100 text-center shadow-md rounded-md" onClick={handleOnClick}>
        <BiCog size={20} className='mr-2'/>
        Options
      </button>
    </div>
  );
};

export default BoardOptions;
