import { useState } from 'react';


import '../Button/Button.css';
import './SearchForm.css';

function SearchForm({ handleSearch }) {

  const [keyword, setKeyword]= useState('');


  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(keyword);
  }

  function handleChange(e) {
    setKeyword(e.target.value);
  }


  return (
  
    <form className="search" onSubmit={handleSubmit}>

      <h2 className="search__heading">What's going on in the world?</h2>
      <p className="search__desc">Find the latest news on any topic and save articles in your personal account.</p>
      
      <fieldset className="search__bar">
        <input className="search__field" type="text" placeholder="Enter topic" onChange={handleChange} />
        <button className="search__button button button_submit" type="submit">Search</button>
      </fieldset>

    </form>

  );
}

export default SearchForm;