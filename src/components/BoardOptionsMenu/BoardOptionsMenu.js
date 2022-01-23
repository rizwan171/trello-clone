import React from 'react';
import { AiOutlinePicture, AiOutlineCloudUpload, AiOutlineCloudDownload, AiOutlineDownload, AiOutlineUpload } from 'react-icons/ai';

const BoardOptionsMenu = () => {
  return (
    // TODO remove text-white
    <div className='h-full w-1/5 fixed z-10 top-0 right-0 bg-trello-gray-300 text-white'>
      <div className='px-8 py-4'>
        <p className='text-2xl'>Board Options</p>
      </div>
      <div className='px-8 text-xl h-full'>
        <div className='h-1/3'>
          <div className='flex mb-2'>
            <AiOutlinePicture size={25} className='mr-3 mt-auto' />
            <p>Background</p>
          </div>
          <hr/>
          <div className='flex'>
            <button className='py-2 px-3 mt-2 mb-2 bg-transparent outline-none border-transparent border-b-4 rounded-sm hover:border-trello-blue-100 hover:border-current text-white items-center text-base'>Colour</button>
            <button className='py-2 px-3 mt-2 mb-2 bg-transparent outline-none border-transparent border-b-4 rounded-sm hover:border-trello-blue-100 hover:border-current text-white items-center text-base'>Image Search</button>
            <button className='py-2 px-3 mt-2 mb-2 bg-transparent outline-none border-transparent border-b-4 rounded-sm hover:border-trello-blue-100 hover:border-current text-white items-center text-base'>Image Upload</button>
          </div>
        </div>
        <div className='h-1/4'>
          <div className='flex items-center'>
            <AiOutlineCloudUpload size={25} className='mr-3 mb-1' />
            <p className='mb-2'>Import</p>
          </div>
          <hr/>
          <div className='flex flex-col'>
            <button className='flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md'>
              <AiOutlineUpload className='mr-3' size={20} />
              Import All</button>
            <button className='flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md'>
              <AiOutlineUpload className='mr-3' size={20} />
              Import Board</button>
            <button className='flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md'>
              <AiOutlineUpload className='mr-3' size={20} />
              Import List</button>
          </div>
        </div>
        <div className='h-1/4'>
          <div className='flex items-center'>
            <AiOutlineCloudDownload size={25} className='mr-3 mb-1' />
            <p className='mb-2'>Export</p>
          </div>
          <hr/>
          <div className='flex flex-col'>
            <button className='flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 items-center text-base shadow-md rounded-md'>
              <AiOutlineDownload className='mr-3' size={20} />
              Export All
            </button>
            <button className='flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md'>
              <AiOutlineDownload className='mr-3' size={20} />
              Export Board
            </button>
            <button className='flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md'>
              <AiOutlineDownload className='mr-3' size={20} />
              Export List</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardOptionsMenu;
