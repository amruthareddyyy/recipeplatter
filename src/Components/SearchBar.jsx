import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css"; 

const SearchBar = ({ handleSubmit, query, isLoading, setQuery }) => {
  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-container">
        <input
          value={query}
          className="search-input"
          placeholder="Search Recipe"
          name="query"
          disabled={isLoading}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          className="search-button"
          type="submit"
          disabled={isLoading || !query}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;