import { useState } from 'react';


import Logo from '../Logo/Logo';
import MenuToggleButton from '../MenuToggleButton/MenuToggleButton';
import Menu from '../Menu/Menu';


import './Navigation.css';


function Navigation({ isSavedNewsHeader = false }) {

  
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const toggleMenu = (e) => {
    setIsMenuOpen(!isMenuOpen);
    e.target.blur();
  }



  return (
    <nav className={`navigation${isSavedNewsHeader ? ' navigation_saved-news' : ''}${isMenuOpen ? ' navigation_open' : ''}`}>

      <Logo />

      <MenuToggleButton isMenuOpen={isMenuOpen} handleClick={toggleMenu} />

      <Menu isMenuOpen={isMenuOpen} isSavedNewsHeader={isSavedNewsHeader} />

    </nav>   
  );
  
}

export default Navigation;