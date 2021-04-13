import { useContext } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext'; 

import logoutIcon from '../../images/logout.svg';
import '../Button/Button.css';
import './SignInOutButton.css';

function SignInOutButton({ isSavedNewsHeader, logout, openLoginPopup }) {

  const currentUserContext = useContext(CurrentUserContext);

  const onSignInClick = (e) => {
    e.preventDefault();
    openLoginPopup();
  }

  return (
    currentUserContext.isLoggedIn ?
      <li>
        <button type="button" className={`button menu__button menu__button_logged-in${isSavedNewsHeader ? ' menu__button_scheme_light' : ''}`}
           onClick={logout} aria-label={`Logout ${currentUserContext.currentUser.name}`}>

          {currentUserContext.currentUser.name}

          <svg className="menu__icon button__icon">
            <use xlinkHref={`${logoutIcon}#logout`}></use>
          </svg>

        </button>
      </li>
      :
      <li>
        <button type="button" className={`button menu__button menu__button_signin${isSavedNewsHeader ? ' menu__button_scheme_light' : ''}`}
          onClick={onSignInClick}>
          Sign In
        </button>
      </li>
  );
}

export default SignInOutButton;