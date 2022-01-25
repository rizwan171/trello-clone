import React from 'react';
import { AiOutlinePicture, AiOutlineCloudUpload, AiOutlineCloudDownload, AiOutlineDownload, AiOutlineUpload, AiFillPicture } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { RiDeleteBin2Line } from 'react-icons/ri';

import ColorOptions from './ColorOptions/ColorOptions';

const BoardOptionsMenu = () => {
  return (
    // TODO remove text-white
    <div className='h-full w-1/5 fixed z-10 top-0 right-0 bg-trello-gray-300 text-white'>
      <div className='px-8 py-4'>
        <p className='text-2xl'>Board Options</p>
      </div>
      <div className='px-8 text-xl h-full'>
        <div className='mb-4'>
          <div className='flex mb-2'>
            <AiOutlinePicture size={25} className='mr-3 mt-auto' />
            <p>Background</p>
          </div>
          <hr />
          <div className='flex'>
            <button className='py-2 px-3 mt-2 mb-2 bg-transparent outline-none border-transparent border-b-4 rounded-sm hover:border-trello-blue-100 hover:border-current text-white items-center text-base'>Colour</button>
            <button className='py-2 px-3 mt-2 mb-2 bg-transparent outline-none border-transparent border-b-4 rounded-sm hover:border-trello-blue-100 hover:border-current text-white items-center text-base'>Image Search</button>
            <button className='py-2 px-3 mt-2 mb-2 bg-transparent outline-none border-transparent border-b-4 rounded-sm hover:border-trello-blue-100 hover:border-current text-white items-center text-base'>Image Upload</button>
          </div>
          <div className='h-52 max-h-96 w-full bg-trello-gray-500 rounded-md text-black p-1 scroll-y-hidden'>
            {/* TODO add back after creating other bacground options
            <ColorOptions /> */}
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
                {/* TODO instead of this placeholder icon, replace with 10-50 random pics from unsplash */}
                
              </div>
            </div>
          </div>
        </div>
        <div className='mb-4'>
          <div className='flex items-center'>
            <AiOutlineCloudUpload size={25} className='mr-3 mb-1' />
            <p className='mb-2'>Import</p>
          </div>
          <hr />
          <div className='flex flex-col'>
            <button className='flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md'>
              <AiOutlineUpload className='mr-2' size={20} />
              Import All</button>
            <button className='flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md'>
              <AiOutlineUpload className='mr-2' size={20} />
              Import Board</button>
            <button className='flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md'>
              <AiOutlineUpload className='mr-2' size={20} />
              Import List</button>
          </div>
        </div>
        <div className='mb-4'>
          <div className='flex items-center'>
            <AiOutlineCloudDownload size={25} className='mr-3 mb-1' />
            <p className='mb-2'>Export</p>
          </div>
          <hr />
          <div className='flex flex-col'>
            <button className='flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 items-center text-base shadow-md rounded-md'>
              <AiOutlineDownload className='mr-2' size={20} />
              Export All
            </button>
            <button className='flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md'>
              <AiOutlineDownload className='mr-2' size={20} />
              Export Board
            </button>
            <button className='flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md'>
              <AiOutlineDownload className='mr-2' size={20} />
              Export List</button>
          </div>
        </div>
        <div>
          <div className='flex items-center'>
            <RiDeleteBin2Line size={25} className='mr-3 mb-2' />
            <p className='mb-2'>Delete</p>
          </div>
          <hr />
          <div className='flex flex-col'>
            <button className='flex py-2 px-3 mt-2 mb-2 bg-red-600 hover:bg-red-800 text-white items-center text-base shadow-md rounded-md'>
              <MdOutlineDelete className='mr-2' size={20} />
              Delete Board
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardOptionsMenu;
