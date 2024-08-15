import { Image } from "../../services/type";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <div>
      <img
        className={css.imgCard}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
