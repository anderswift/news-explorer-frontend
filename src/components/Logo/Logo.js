import { NavLink } from 'react-router-dom';

import '../Link/Link.css';
import './Logo.css';

function Logo() {
  return (
    
    <h1 className="logo">
      <NavLink className="logo__link link" to="/">
        NewsExplorer
      </NavLink>
    </h1>
    
  );
}

export default Logo;