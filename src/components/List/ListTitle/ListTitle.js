import React, { useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

const ListTitle = ({ titleText }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div className='flex items-center select-none cursor-pointer'>
      {
        selected ? (
          <input type="text" id="rounded-email" autoFocus className="text-trello-gray-300 font-semibold rounded-sm flex-1 border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100" onBlur={() => setSelected(false)}/>
        ) : (
          <h2 className='flex-1  text-trello-gray-300 font-semibold' onClick={() => setSelected(true)}>{ titleText }</h2>
        )
      }
      <div className='hover:bg-trello-gray-500 p-0.5 ml-1.5 rounded-ibsm'>
        <MdMoreHoriz size={20} className='text-trello-gray-200'/>
      </div>
    </div>
  );
}

export default ListTitle;