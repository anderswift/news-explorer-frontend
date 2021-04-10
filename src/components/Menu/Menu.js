import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import SignInOutButton from '../SignInOutButton/SignInOutButton';

import '../Link/Link.css';
import '../List/List.css';
import './Menu.css';

function Menu({ isSavedNewsHeader = false, isMenuOpen = true, logout, openLoginPopup }) {

  const currentUserContext = useContext(CurrentUserContext);

  return (
    <ul className={`list menu${isMenuOpen ? ' menu_open' : ''}${isSavedNewsHeader ? ' menu_saved-news' : ''}`}>
      <li>
        <NavLink to="/" exact={true} className={`menu__link${isSavedNewsHeader ? ' menu__link_saved-news' : ''} link`} activeClassName="menu__link_current">Home</NavLink>
      </li>

      {currentUserContext.isLoggedIn &&
        <li>
          <NavLink to="/saved-news" 
            className={`menu__link${isSavedNewsHeader ? ' menu__link_saved-news' : ''} link`} 
            activeClassName="menu__link_current"
          >
            Saved Articles
          </NavLink>
        </li>
      }

      <SignInOutButton isSavedNewsHeader={isSavedNewsHeader} logout={logout} openLoginPopup={openLoginPopup} />

    </ul>
  );
  
}

export default Menu;