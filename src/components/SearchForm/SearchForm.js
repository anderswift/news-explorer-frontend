import './SearchForm.css';

function SearchForm() {
  return (
  
    <form className="search">

      <h2 className="search__heading">What's going on in the world?</h2>
      <p className="search__desc">Find the latest news on any topic and save articles in your personal account.</p>
      
      <fieldset class="search__bar">
        <input className="search__field" type="text" placeholder="Enter topic" />
        <button className="search__button" type="submit">Search</button>
      </fieldset>

    </form>

  );
}

export default SearchForm;