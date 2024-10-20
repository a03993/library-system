import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [click, setClick] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClick = () => {
    setClick(true);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
    setClick(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by book title"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {click && (
          <button type="button" onClick={handleClear}>
            X
          </button>
        )}
        <button type="submit" onClick={handleClick}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
