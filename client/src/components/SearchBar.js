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
    <div className="container">
      <form onSubmit={handleSearch} className="d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by book title"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {click && (
          <button
            type="button"
            className="btn btn-outline-secondary me-2"
            onClick={handleClear}
          >
            X
          </button>
        )}
        <button type="submit" onClick={handleClick} className="btn btn-primary">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
