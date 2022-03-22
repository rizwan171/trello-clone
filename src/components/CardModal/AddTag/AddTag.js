import React, { useEffect, useRef, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

const AddTag = () => {
  const inputRef = useRef();
  const [showSelector, setShowSelector] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const openSelector = () => {
    setShowSelector(true);
  };

  const closeSelector = () => {
    setShowSelector(false);
  };

  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
  };

  return showSelector ? (
    <div className="flex gap-1 flexgap rounded-ibsm items-center">
      <input
        ref={inputRef}
        className="p-1 w-44 rounded-sm"
        placeholder="Select Tag..."
        type="text"
        value={searchValue}
        autoFocus
        onChange={handleOnChange}
      />
      <FiX className="cursor-pointer" onClick={closeSelector} />
    </div>
  ) : (
    <div className="p-1 rounded-ibsm flex items-center cursor-pointer hover:bg-black hover:bg-opacity-5" onClick={openSelector}>
      <FiPlus className="mr-0.5" />
      <p>Add Tag</p>
    </div>
  );
};

export default AddTag;
