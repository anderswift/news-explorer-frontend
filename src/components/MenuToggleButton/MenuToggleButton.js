import './MenuToggleButton.css';

import menuIcon from '../../images/menu-icon.svg';

function MenuToggleButton({ isMenuOpen, handleClick }) {

  return (
    <button className="menu__toggle" type="button" aria-label="Show/Hide Menu" onClick={handleClick}>
      <svg className="menu__toggle-icon">
        <use xlinkHref={`${menuIcon}#${isMenuOpen ? 'close' : 'open'}`}></use>
      </svg>
    </button>
  );
  
}

export default MenuToggleButton;