import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images }) => {
  return (
    <div>
      <ul className={css.imgList}>
        {images.map((image) => (
          <li key={image.id}>
            <ImageCard image={image} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
