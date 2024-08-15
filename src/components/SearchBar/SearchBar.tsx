import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FormEvent } from "react";

interface SearchBarProps {
  onSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = (e.target as HTMLFormElement).elements.namedItem(
      "search"
    ) as HTMLInputElement;
    if (!form) {
      toast.error("Please enter search name of images!");
      return;
    }

    onSearch(form.value);
    if ("reset" in e.target) {
      (e.target as HTMLFormElement).reset();
    }
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
