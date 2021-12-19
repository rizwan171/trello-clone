import AddCard from "./AddCard";
import Card2 from "./Card2";
import ListTitle2 from "./ListTitle2";

const List2 = () => {
  return (
    <div className="shadow bg-trello-gray-100 rounded-md w-80 m-1 px-2 py-4">
      <ListTitle2 />
      <div>
        <Card2 />
        <Card2 />
        <Card2 />
      </div>
      <AddCard />
    </div>
  )
}

export default List2;