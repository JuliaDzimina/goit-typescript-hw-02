import { useEffect, useState } from "react";

import "./App.css";
import { getImages } from "./services/api";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState(" ");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;

    async function fetchImages() {
      try {
        setIsLoading(true);
        const data = await getImages(query, page);
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
    setPage(1);
    setQuery(data);
    setImages([]);
  };
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ImageGallery images={images} />

      <ImageModal />
    </>
  );
}

export default App;
