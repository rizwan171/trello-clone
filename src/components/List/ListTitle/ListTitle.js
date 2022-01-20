import React, { useContext, useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import { UpdateTitleContext } from '../../../contexts/UpdateTitleContext.js';

const ListTitle = ({ listId, listTitle }) => {
  const [selected, setSelected] = useState(false);
  const [editableTitle, setEditableTitle] = useState(listTitle);
  const updateListTitle = useContext(UpdateTitleContext);

  const handleOnChange = (e) => {
    setEditableTitle(e.target.value);
  }

  const handleOnBlur = () => {
    setSelected(false);
    setEditableTitle(listTitle);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSelected(false);
      setEditableTitle(editableTitle);
      updateListTitle(editableTitle, listId);
    }
  }

  return (
    <div className='flex items-center select-none cursor-pointer'>
      {
        selected ? (
          <input type="text" value={editableTitle} id="rounded-email" autoFocus className="text-trello-gray-300 font-semibold rounded-sm flex-1 border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100" onBlur={handleOnBlur} onChange={handleOnChange} onKeyDown={handleKeyDown}/>
        ) : (
          <h2 className='flex-1 text-trello-gray-300 font-semibold' onClick={() => setSelected(true)}>{ listTitle }</h2>
        )
      }
      <div className='hover:bg-trello-gray-500 p-0.5 ml-1.5 rounded-ibsm'>
        <MdMoreHoriz size={20} className='text-trello-gray-200'/>
      </div>
    </div>
  );
}

export default ListTitle;