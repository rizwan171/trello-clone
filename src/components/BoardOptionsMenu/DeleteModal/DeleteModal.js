import React from "react";

const DeleteModal = ({ closeDeleteModal, handleDeleteBoard }) => {
  return (
    <div
      id="cardModal"
      className="z-50 min-h-full min-w-full flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-30"
    >
      <div className="relative px-4 w-full max-w-sm h-full md:h-auto mb-36">
        <div className="relative bg-trello-gray-100 rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center px-6 pb-6">
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 text-base rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleDeleteBoard()}
            >
              Delete
            </button>
            <button
              type="button"
              className="text-gray-600 bg-gray-300 text-base rounded-lg ml-2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => closeDeleteModal()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
