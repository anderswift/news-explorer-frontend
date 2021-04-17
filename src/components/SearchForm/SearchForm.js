import { useState, useContext, useRef } from 'react';

import '../Input/Input.css';
import '../Button/Button.css';
import './SearchForm.css';

import CurrentUserContext from '../../contexts/CurrentUserContext'; 


function SearchForm({ handleSearch, keyword }) {

  const searchFieldRed = useRef(); // for focus only
  
  const currentUserContext = useContext(CurrentUserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermInvalid, setSearchTermInvalid] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if(searchTerm) handleSearch(searchTerm);
    else {
      setSearchTermInvalid(true);
      searchFieldRed.current.focus();
    }
  }

  function handleChange(e) {
    setSearchTermInvalid(false);
    setSearchTerm(e.target.value);
  }


  return (
    <form className="search" onSubmit={handleSubmit}>

      <h2 className="search__heading">What's going on in the world?</h2>
      <p className="search__desc">Find the latest news on any topic and save articles in your personal account.</p>
      
      <fieldset className="search__bar">
        <input
          ref={searchFieldRed}
          className={`input search__field${searchTermInvalid ? ' input_has-error search__field_has-error' : ''}`}
          type="text"
          placeholder={searchTermInvalid ? 'You must enter a topic' : 'Enter topic'}
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