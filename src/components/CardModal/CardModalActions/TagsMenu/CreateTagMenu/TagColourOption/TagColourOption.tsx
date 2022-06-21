import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import { setSelectedTagColour } from "../../../../../../features/selectedTagColourSlice";
import TagColourOptionProps from "../../../../../../types/components/TagColourOptionProps";

const TagColourOption = ({ colour }: TagColourOptionProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const selectedTagColour = useAppSelector((state) => state.selectedTagColour.value);
  const ref = useRef<HTMLDivElement>(null);
  let styles = "h-11 w-12 rounded-md cursor-pointer";
  styles += colour == selectedTagColour ? " ring-2 ring-trello-blue-100" : "";

  useEffect(() => {
    if (ref.current) {
      ref.current.style.background = colour;
    }
  }, []);

  const setSelectedColour = () => {
    dispatch(setSelectedTagColour(colour));
  };

  return (
    <div ref={ref} className={styles} onClick={setSelectedColour}>
      <div className="h-full w-full hover:bg-black hover:bg-opacity-20 rounded-md"></div>
    </div>
  );
};

export default TagColourOption;
