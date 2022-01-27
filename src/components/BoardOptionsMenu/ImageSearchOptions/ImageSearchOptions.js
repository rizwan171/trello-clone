import React from 'react';

const ImageSearchOptions = () => {
  return (
    <div className='flex flex-col'>
      <input
        // value={}
        type="text"
        placeholder='Search..'
        autoFocus
        className='w-full text-left box-border text-sm outline-none border-2 border-trello-gray-200 shadow bg-trello-gray-400 hover:bg-trello-gray-400 rounded-md mb-2 p-2'
      // onBlur={() => setOpen(false)}
      />
      <div className='w-full grid grid-cols-2 gap-1'>
        <div className='bg-black h-28 rounded-md '></div>
        <div className='bg-black h-28 rounded-md'></div>
        <div className='bg-black h-28 rounded-md'></div>
        <div className='bg-black h-28 rounded-md'></div>
      </div>
    </div>
  );
};

export default ImageSearchOptions;
