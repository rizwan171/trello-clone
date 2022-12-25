import BoardTitle from "./BoardTitle/BoardTitle";
import BoardOptions from "./BoardOptions/BoardOptions";

const NavBar = () => {
  return (
    <div className="w-full px-6 pt-3">
      <div className="flex w-full m-1">
        <BoardTitle />
        <BoardOptions />
      </div>
    </div>
  );
};

export default NavBar;
