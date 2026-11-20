
import { useState } from "react";
import { Search, X } from "lucide-react";

function SearchBar({ onSearch, placeholder = "Search products..." }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Live search
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSearch) {
      onSearch(searchTerm.trim());
    }
  };

  const clearSearch = () => {
    setSearchTerm("");

    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100"
    >
      <Search size={21} className="shrink-0 text-violet-600" />

      <input
        type="search"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
        aria-label="Search products"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={clearSearch}
          className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-red-500"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}

      <button
        type="submit"
        className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-800"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
