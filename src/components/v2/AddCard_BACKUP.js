import React, { useState, useRef } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Transition, animated, useTransition, config } from 'react-spring';
import CardText from './CardText';

const AddCard = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const transitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: open,
    config: config.slow,
  })

  return (
    <>
    {
      open ? (
        // transitions(
        //   (styles, item) => item && 
        //     <animated.div style={styles}>
        //       <textarea placeholder='Type something...' autoFocus className='w-full shadow bg-white hover:bg-trello-gray-400 cursor-pointer rounded-md p-2 my-1.5' onBlur={() => setOpen(false)}/>        
        //     </animated.div>
        // )     
          <CardText text={text} setText={setText} setOpen={setOpen}/>
      ) : (
        <div className='flex hover:bg-trello-gray-500 rounded-ibsm items-center cursor-pointer text-trello-gray-600 p-1' onClick={() => setOpen(true)}>
          <FiPlus size={20} />
          <h2 className='flex-1 ml-1.5'>Add a card</h2>
        </div>
      )
    }
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

  const classNames = `transition-height ease duration-300 w-full p-2 my-1.5 ${isOpen ? "" : "m-h-0"}`;
  return (
    <div
      ref={ref}
      aria-hidden={!isOpen}
      // style={inlineStyle}
      className={classNames}
    >
      {children}
    </div>
  );
};