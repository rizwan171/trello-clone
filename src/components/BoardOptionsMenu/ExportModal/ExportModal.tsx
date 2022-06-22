import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { ExportModalProps } from "../../../types/components/ExportModalProps";

const ExportModal = ({ closeExportModal, handleExportList }: ExportModalProps): JSX.Element => {
  const lists = useAppSelector((state) => state.lists.value);
  const [selectedListId, setSelectedListId] = useState("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedListId(e.target.value);
  };

  return (
    <div
      id="cardModal"
      className="z-50 min-h-full min-w-full flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-30"
    >
      <div className="relative px-4 w-full max-w-sm h-full md:h-auto mb-36">
        <div className="relative bg-trello-gray-100 rounded-lg shadow dark:bg-gray-700">
          <div className="flex p-6">
            <div className="">
              <select
                value={selectedListId}
                onChange={handleChange}
                className="form-select p-6 appearance-none w-md px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option selected value="" disabled>
                  Select List...
                </option>
                {lists.map((list) => {
                  return (
                    <option key={list.id} value={list.id}>
                      {list.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex items-center px-6 pb-6">
            <button
              type="button"
              className="text-white bg-trello-green-100 hover:bg-trello-green-200 text-base rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleExportList(selectedListId)}
            >
              Export
            </button>
            <button
              type="button"
              className="text-gray-600 bg-gray-300 text-base rounded-lg ml-2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => closeExportModal()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
