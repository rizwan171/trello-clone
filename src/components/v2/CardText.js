import React from 'react';

const CardText = ({ text, setText, setOpen }) => {
  return (
    <div>
      <textarea placeholder='Type something...' autoFocus className='w-full shadow bg-white hover:bg-trello-gray-400 cursor-pointer rounded-md p-2 my-1.5' onBlur={() => setOpen(false)}/>
    </div>
  );
}

export default CardText;