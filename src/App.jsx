import { useEffect, useState } from "react";

import "./App.css";
import { getImages } from "./services/api";
import toast, { Toaster } from "react-hot-toast";
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
        if (!data.data.results.length) {
          toast.error("No images found. Try another request", {
            position: "top-right",
          });
        }

        setImages((prevImages) => [...prevImages, ...data.results]);
      } catch (error) {
        setIsError(false);
      } finally {
        setIsLoading(true);
      }
    }
    fetchImages();
  }, [query, page]);

  return (
    <>
      <SearchBar />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ImageGallery images={images} />

      <ImageModal />
    </>
  );
}

export default App;
