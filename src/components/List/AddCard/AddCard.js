import React, { useState, useRef, useEffect } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

const AddCard = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleAddCard = () => {
    // TODO add the addCard logic
    setOpen(false);
  }

  return (
    <> 
    
    <Collapse isOpen={open}>
      <textarea ref={inputRef} value={text} placeholder='Type something...' autoFocus className='w-full box-border outline-none border-2 border-trello-blue-100 shadow bg-white hover:bg-trello-gray-400 cursor-pointer rounded-md p-2 my-1.5' onBlur={() => setOpen(false)}/>
      <div className='flex items-center'>
        <button type="button" className="py-2 px-3 bg-trello-green-100 hover:bg-trello-green-200 text-white transition ease-in duration-200 text-center text-base shadow-md rounded-md" onClick={() => handleAddCard()}>
          Add Card
        </button>
        <FiX onClick={() => setOpen(false)} size={36} className='text-trello-gray-200 hover:bg-trello-gray-500 cursor-pointer rounded-full ml-1 p-1'/>
      </div>
    </Collapse>
    
    <Collapse isOpen={!open}>
      <div className='flex hover:bg-trello-gray-500 rounded-ibsm items-center cursor-pointer text-trello-gray-600 p-1' onClick={() => setOpen(true)}>
        <FiPlus size={20} />
        <h2 className='flex-1 ml-1.5'>Add a card</h2>
      </div>
    </Collapse>
      
    </>
  )
}

export default AddCard;

const Collapse = ({ isOpen, children }) => {
  const ref = useRef(null);

  const inlineStyle = isOpen
    ? { height: ref.current?.scrollHeight }
    : { height: 0 };

  return (
    <div
      ref={ref}
      aria-hidden={!isOpen}
      style={inlineStyle}
      className="transition-height ease overflow-hidden duration-300"
    >
      {children}
    </div>
  );
};