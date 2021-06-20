import { useState, useContext, useRef, useEffect } from 'react';

import '../Input/Input.css';
import '../Button/Button.css';
import './SearchForm.css';

import CurrentUserContext from '../../contexts/CurrentUserContext'; 


function SearchForm({ handleSearch, keyword }) {

  const searchFieldRef = useRef(); // for focus only
  const searchFormRef = useRef(); // for focus only
  
  const currentUserContext = useContext(CurrentUserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermInvalid, setSearchTermInvalid] = useState(false);
  const [checkedSavedSearch, setCheckedSavedSearch] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if(searchTerm) handleSearch(searchTerm);
    else {
      setSearchTermInvalid(true);
      searchFieldRef.current.focus();
    }
  }

  function handleChange(e) {
    setSearchTermInvalid(false);
    setSearchTerm(e.target.value);
  }


  useEffect(() => {
    if(!checkedSavedSearch && currentUserContext.isLoggedIn && currentUserContext.lastSearchKeyword) {
      setSearchTerm(currentUserContext.lastSearchKeyword);
      setCheckedSavedSearch(true);
    } else if (checkedSavedSearch && !currentUserContext.isLoggedIn) {
      setCheckedSavedSearch(false);
      setSearchTerm('');
    }
  }, [checkedSavedSearch, currentUserContext.isLoggedIn, currentUserContext.lastSearchKeyword]);


  return (
    <form className="search" onSubmit={handleSubmit} ref={searchFormRef}>

      <h2 className="search__heading">What's going on in the world?</h2>
      <p className="search__desc">Find the latest news on any topic and save articles in your personal account.</p>
      
      <fieldset className="search__bar">
        <input
          ref={searchFieldRef}
          className={`input search__field${searchTermInvalid ? ' input_has-error search__field_has-error' : ''}`}
          type="text"
          placeholder={searchTermInvalid ? 'You must enter a topic' : 'Enter topic'}
          onChange={handleChange}
          value={searchTerm}
        />
        <button className="search__button button button_type_submit" type="submit">
          Search
        </button>
      </fieldset>

    </form>
  );
}

export default SearchForm;