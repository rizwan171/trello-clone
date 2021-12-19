import React, { useState, useRef, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import CardText from './CardText';

const AddCard = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open])

  return (
    <> 
    
    <Collapse isOpen={open}>
      {/* <div> */}
        <textarea ref={inputRef} value={text} placeholder='Type something...' autoFocus className='w-full shadow bg-white hover:bg-trello-gray-400 cursor-pointer rounded-md p-2 my-1.5' onBlur={() => setOpen(false)}/>
      {/* </div> */}
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

/* Logic */
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