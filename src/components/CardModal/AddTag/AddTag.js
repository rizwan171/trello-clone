import React, { useRef, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { createTag } from "../../../features/tagsSlice";

const AddTag = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.value);
  const options = tags.map((tag) => {
    return {
      label: tag.name,
      value: tag.id,
    }
  })
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

  const handleOnKeyDown = (e) => {
    if (e.code === "Enter") {
      dispatch(createTag({ name: searchValue }));
      setSearchValue("");
    }
  };

  const handleSelect = (e) => {
    console.log("hi");
    console.log(e);
  }

  return showSelector ? (
    <div className="flex gap-1 flexgap rounded-ibsm items-center">
      {/* <input
        ref={inputRef}
        className="p-1 w-44 rounded-sm"
        placeholder="Add Tag..."
        type="text"
        value={searchValue}
        autoFocus
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      /> */}
      <Select options={options} autoFocus openMenuOnFocus maxMenuHeight={220} onInputChange={handleSelect} noOptionsMessage={""}/>
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
