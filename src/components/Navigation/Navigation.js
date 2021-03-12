import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';


import Logo from '../Logo/Logo';
import MenuToggleButton from '../MenuToggleButton/MenuToggleButton';
import SignInOutButton from '../SignInOutButton/SignInOutButton';


import './Navigation.css';


function Navigation({ isSavedNewsHeader = false }) {

  const currentUserContext = useContext(CurrentUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const toggleMenu = (e) => {
    setIsMenuOpen(!isMenuOpen);
    e.target.blur();
  }



  return (
    <nav className={`menu${isSavedNewsHeader ? ' menu_saved-news' : ''}${isMenuOpen ? ' menu_open' : ''}`}>

      <Logo />

      <MenuToggleButton isMenuOpen={isMenuOpen} handleClick={toggleMenu} />

      <ul className={`list-reset menu__list${isMenuOpen ? ' menu__list_open' : ''}`}>
        <li>
          <NavLink to="/" exact={true} className={`menu__link${isSavedNewsHeader ? ' menu__link_saved-news' : ''}`} activeClassName="menu__link_current">Home</NavLink>
        </li>

        {currentUserContext.isLoggedIn &&
          <li>
            <NavLink to="/saved-news" 
              className={`menu__link${isSavedNewsHeader ? ' menu__link_saved-news' : ''}`} 
              activeClassName="menu__link_current"
            >
              Saved Articles
            </NavLink>
          </li>
        }

        <SignInOutButton isSavedNewsHeader={isSavedNewsHeader} />

      </ul>
    </nav>   
  );
  
}

export default Navigation;