import React from 'react';
import BoardTitle from './BoardTitle/BoardTitle';
import BoardOptions from './BoardOptions/BoardOptions';

const NavBar = () => {
  return (
    <div className='flex w-full px-6 pt-3' >
      <div className='bg-gray-400 w-full h-14 m-1'>
        <BoardTitle boardTitle={"Board 1Board 1Board 1Board 1Board 1Board 1"}/>
        <BoardOptions />
      </div>
    </div>
  )
};

export default NavBar;
