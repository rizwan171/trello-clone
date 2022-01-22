import React, { useState } from 'react';

const BoardTitle = ({ boardTitle }) => {
  const [selected, setSelected] = useState(false);
  const [editableTitle, setEditableTitle] = useState(boardTitle);
  const [width, setWidth] = useState(20);


  const handleOnChange = (e) => {
    setEditableTitle(e.target.value);
    if (e.target.value.length >= 20)
      setWidth(e.target.value.length);
  }

  const handleOnBlur = () => {
    setSelected(false);
    setEditableTitle(boardTitle);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSelected(false);
      setEditableTitle(editableTitle);
      // updateListTitle(editableTitle, listId);
    }
  }

  const handleOnFocus = (e) => {
    if (e.target.value.length >= 20)
      setWidth(e.target.value.length);
  }

  return (
    <div className='flex h-14 items-center select-none text-3xl w-full'>
      {
        selected ? (
          <input type="text" value={editableTitle} id="rounded-email" autoFocus size={width} onFocus={handleOnFocus} className="ml-2 py-1 text-trello-gray-300 font-semibold rounded-sm border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100" onBlur={handleOnBlur} onChange={handleOnChange} onKeyDown={handleKeyDown} />
        ) : (
          <h2 className='ml-2 text-trello-gray-300 font-semibold cursor-pointer' onClick={() => setSelected(true)}>{boardTitle}</h2>
        )
      }
    </div>
  );
}

export default BoardTitle;