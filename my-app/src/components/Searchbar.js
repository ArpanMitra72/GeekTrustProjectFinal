import React, { useState } from "react";
import "./Searchbar.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuary, setSearchQuary] = useState("");

  const handleSearch = (event) => {
    const quary = event.target.value;
    setSearchQuary(quary);
    onSearch(quary);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name, email or role"
        className="search-desktop"
        fullWidth
        value={searchQuary}
        onChange={handleSearch}
      />
    </div>
  );
};
export default SearchBar;
