import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, onOpen }) => {
  return (
    <div>
      <ul className={css.imgList}>
        {images.map((image) => (
          <li
            key={image.id}
            onClick={() => {
              onOpen(image);
            }}
          >
            <ImageCard image={image} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
