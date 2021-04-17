import './Header.css';

import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';


function Header({ handleSearch, logout, openLoginPopup }) {
  return (
    <header className="header">
      
      <Navigation logout={logout} openLoginPopup={openLoginPopup} />

      <SearchForm handleSearch={handleSearch} />

    </header>
  );
}

export default Header;