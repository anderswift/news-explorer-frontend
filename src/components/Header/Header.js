import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm.js';

import './Header.css';



function Header({ handleSearch, logout, openLoginPopup }) {
  return (
    <header className="header">
      
      <Navigation logout={logout} openLoginPopup={openLoginPopup} />

      <SearchForm handleSearch={handleSearch} />

    </header>
  );
}

export default Header;