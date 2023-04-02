import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <button
      style={{
        height: "40px",
        width: "200px",
        borderRadius: "20px",
        textAlign: "center",
        fontWeight: "bold",
        border: "2px solid black",
        backgroundColor: "white",
        margin: "10px",
      }}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
