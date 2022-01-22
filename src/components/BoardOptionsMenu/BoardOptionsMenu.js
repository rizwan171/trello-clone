import React from 'react';
import { AiOutlinePicture, AiOutlineCloudUpload, AiOutlineCloudDownload } from 'react-icons/ai';

const BoardOptionsMenu = () => {
  return (
    // TODO remove text-white
    <div className='h-full w-1/5 fixed z-10 top-0 right-0 bg-trello-gray-300 text-white'>
      <div className='px-8 py-4'>
        <p className='text-2xl'>Board Options</p>
      </div>
      <div className='px-8 text-xl h-full'>
        <div className='h-1/3'>
          <div className='flex'>
            <AiOutlinePicture size={25} className='mr-3 mt-auto' />
            <p>Background</p>
          </div>
        </div>
        <div className='h-1/4'>
          <div className='flex items-center'>
            <AiOutlineCloudUpload size={25} className='mr-3 mb-1' />
            <p className='mb-2'>Import</p>
          </div>
          <div className='flex flex-col'>
            <button className='py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white text-center text-base shadow-md rounded-md'>Import All</button>
            <button className='py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white text-center text-base shadow-md rounded-md'>Import Board</button>
            <button className='py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white text-center text-base shadow-md rounded-md'>Import List</button>
          </div>
        </div>
        <div className='h-1/4'>
        <div className='flex items-center'>
          <AiOutlineCloudDownload size={25} className='mr-3 mb-1' />
        <p className='mb-2'>Export</p>
        </div>
          <div className='flex flex-col'>
            <button className='py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white text-center text-base shadow-md rounded-md'>Export All</button>
            <button className='py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white text-center text-base shadow-md rounded-md'>Export Board</button>
            <button className='py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white text-center text-base shadow-md rounded-md'>Export List</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardOptionsMenu;
