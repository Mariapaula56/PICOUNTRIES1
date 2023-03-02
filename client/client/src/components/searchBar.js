import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions/actions";
import "../components/searchBar.css";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameCountries(name)); //mi estado local name
  }

  return (
    <div className="search-container">
      <div className="input-icons">
        <input
          className="input-field"
          type="text"
          placeholder="Search..."
          onChange={(e) => handleInputChange(e)}
          maxLength={20}
        />

        <button
          className="button-search"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Search
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
