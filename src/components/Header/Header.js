import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm.js';

import './Header.css';



function Header({ handleSearch }) {
  return (
    <header className="header">
      
      <Navigation/>

      <SearchForm handleSearch={handleSearch} />

    </header>
  );
}

export default Header;