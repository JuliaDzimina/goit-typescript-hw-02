import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "0",
    padding: "0",
    backgroundColor: "transparent",
    pointerEvents: "none",
  },
};

const ImageModal = ({
  onClose,
  isOpen,
  data: {
    urls: { regular },
    alt_description,
    likes,
  },
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={css.overlay}
      style={customStyles}
    >
      <div className={css.box}>
        <img className={css.img} src={regular} alt={alt_description} />
        <div className={css.boxInfo}>
          <p>{alt_description}</p>
          <p>Likes: {likes}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
