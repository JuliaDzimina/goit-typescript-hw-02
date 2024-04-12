import { useEffect, useState } from "react";

import "./App.css";
import { getImages } from "./services/api";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function fetchImages() {
      try {
        setIsLoading(true);
        const data = await getImages(query, page);
        if (!data.results.length) {
          toast.error("No images found. Try another request");
        }
        setImages((prevImages) => [...prevImages, ...data.results]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [query, page]);

  const handleSearch = (data) => {
    setQuery(data);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (image) => {
    setIsOpen(true);
    setSelectedImage(image);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ImageGallery images={images} onOpen={openModal} />
      {images.length > 0 && <LoadMoreBtn onLoadMore={onLoadMore} />}

      {selectedImage.urls && (
        <ImageModal isOpen={isOpen} onClose={closeModal} data={selectedImage} />
      )}
      <Toaster position="top-left" />
    </>
  );
}

export default App;
