import { useState } from 'react';

import './Navigation.css';

import Logo from '../Logo/Logo';
import MenuToggleButton from '../MenuToggleButton/MenuToggleButton';
import Menu from '../Menu/Menu';

import '../PageSection/PageSection.css';


function Navigation({ isSavedNewsHeader = false, logout, openLoginPopup }) {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = (e) => {
    setIsMenuOpen(!isMenuOpen);
    e.target.blur();
  }


  return (
    <nav className={`navigation${isSavedNewsHeader ? ' navigation_scheme_light' : ''}${isMenuOpen ? ' navigation_open' : ''}`}>
      <div className="navigation__inner page-section">

        <Logo />

        <MenuToggleButton isMenuOpen={isMenuOpen} handleClick={toggleMenu} />

        <Menu isMenuOpen={isMenuOpen} isSavedNewsHeader={isSavedNewsHeader} logout={logout} openLoginPopup={openLoginPopup}  />

      </div>
    </nav>   
  );
  
}

export default Navigation;