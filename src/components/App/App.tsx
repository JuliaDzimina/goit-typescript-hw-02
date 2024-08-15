import { useEffect, useState } from "react";

import "./App.css";
import { getImages } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { Image } from "../../services/type";

interface Results {
  results: Image[];
  total_pages: number;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function fetchImages(): Promise<void> {
      try {
        setIsLoading(true);
        const data: Results = await getImages(query, page);
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

  const handleSearch = (data: string): void => {
    setQuery(data);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = (): void => {
    setPage(page + 1);
  };

  const openModal = (image: Image): void => {
    setIsOpen(true);
    setSelectedImage(image);
  };
  const closeModal = (): void => setIsOpen(false);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ImageGallery images={images} onOpen={openModal} />
      {images.length > 0 && <LoadMoreBtn onLoadMore={onLoadMore} />}

      {selectedImage && (
        <ImageModal isOpen={isOpen} onClose={closeModal} data={selectedImage} />
      )}
      <Toaster position="top-left" />
    </>
  );
}

export default App;
