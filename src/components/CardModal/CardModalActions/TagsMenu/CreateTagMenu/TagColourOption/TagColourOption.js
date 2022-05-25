import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTagColour } from "../../../../../../features/selectedTagColourSlice";

const TagColourOption = ({ colour }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const selectedTagColour = useSelector((state) => state.selectedTagColour.value);
  let styles = "h-11 w-12 rounded-md cursor-pointer";
  styles += colour == selectedTagColour ? " ring-2 ring-trello-blue-100" : "";

  useEffect(() => {
    ref.current.style.background = colour;
  }, []);

  const setSelectedColour = () => {
    dispatch(setSelectedTagColour(colour));
  }

  return (
    <div
      ref={ref}
      className={styles}
      onClick={setSelectedColour}
    >
      <div className="h-full w-full hover:bg-black hover:bg-opacity-20 rounded-md"></div>
    </div>
  );
};

export default TagColourOption;
