import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { Image } from "../../services/type";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Image;
}

const ImageModal: React.FC<ImageModalProps> = ({
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
