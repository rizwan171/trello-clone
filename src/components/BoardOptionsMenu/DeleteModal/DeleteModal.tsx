import { DeleteModalProps } from "../../../types/components/DeleteModalProps";

const DeleteModal = ({ closeDeleteModal, handleDeleteBoard }: DeleteModalProps) => {
  return (
    <div
      id="cardModal"
      className="z-50 min-h-full min-w-full flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-30"
    >
      <div className="relative px-4 w-full max-w-sm h-full md:h-auto mb-36">
        <div className="relative bg-trello-gray-100 rounded-lg shadow">
          <p className="flex p-6 text-gray-700">
            Are you sure you want to delete this board and all its contents? The data will not be recoverable after deleting.
          </p>
          <div className="flex items-center px-6 pb-6">
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 text-base rounded-lg px-5 py-2.5 text-center"
              onClick={() => handleDeleteBoard()}
            >
              Delete
            </button>
            <button
              type="button"
              className="text-gray-600 bg-gray-300 text-base rounded-lg ml-2 px-5 py-2.5 text-center"
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
