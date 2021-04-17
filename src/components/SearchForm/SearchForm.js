import { useState, useContext } from 'react';

import '../Input/Input.css';
import '../Button/Button.css';
import './SearchForm.css';

import CurrentUserContext from '../../contexts/CurrentUserContext'; 


function SearchForm({ handleSearch, keyword }) {
  
  const currentUserContext = useContext(CurrentUserContext);
  const [searchTerm, setSearchTerm] = useState();


  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(searchTerm);
  }

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }


  return (
    <form className="search" onSubmit={handleSubmit}>

      <h2 className="search__heading">What's going on in the world?</h2>
      <p className="search__desc">Find the latest news on any topic and save articles in your personal account.</p>
      
      <fieldset className="search__bar">
        <input
          className="input search__field"
          type="text"
          placeholder="Enter topic"
          onChange={handleChange}
          value={searchTerm !== undefined ? searchTerm : currentUserContext.lastSearchKeyword}
        />
        <button className="search__button button button_type_submit" type="submit">
          Search
        </button>
      </fieldset>

    </form>
  );
}

export default SearchForm;