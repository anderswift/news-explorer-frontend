import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm.js';

import './Header.css';



function Header() {
  return (
    <header className="header">
      
      <Navigation/>

      <SearchForm />

    </header>
  );
}

export default Header;