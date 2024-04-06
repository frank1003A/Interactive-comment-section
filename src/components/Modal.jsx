/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Button } from "./Buttons";

const CancelModal = ({ open, onCloseModal, handleDelete }) => {
  return (
    <Modal
      styles={{
        modal: {
          borderRadius: 8,
          maxWidth: "300px",
          padding: 0,
          backgroundColor: "transparent",
        },
        modalContainer: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        },
      }}
      open={open}
      onClose={onCloseModal}
      showCloseIcon={false}
    >
      <div className="rounded-[8px] flex flex-col gap-3 bg-gray-100 dark:bg-neutral-700 p-6">
        <h2 className="font-bold text-[16px] dark:text-white">
          Delete Comment
        </h2>
        <p className="text-[13px] text-gray-500 dark:text-white">
          Are you sure you want to delete this comment? This will remove the
          comment and can&apos;t be undone
        </p>
        <div className="flex gap-2">
          <Button className={"bg-gray-500"} onClick={onCloseModal}>
            NO, CANCEL
          </Button>
          <Button
            className={"bg-red-400 dark:bg-red-400"}
            onClick={handleDelete}
          >
            YES, DELETE
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelModal;
