import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target.elements.search.value.trim();
    if (!form) {
      toast.error("Please enter search name of images!");
      return;
    }

    onSearch(form);
    e.target.reset();
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
        <Toaster position="top-left" />
      </form>
    </header>
  );
};

export default SearchBar;
