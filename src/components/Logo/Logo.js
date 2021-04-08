import { NavLink, useLocation } from 'react-router-dom';

import '../Link/Link.css';
import './Logo.css';

function Logo(props) {

  const location = useLocation();

  return (
    <>
    { location.pathname === '/' ? 
      <h1 className="logo">
        <NavLink className="logo__link link" to="/">
          NewsExplorer
        </NavLink>
      </h1>
      :
      <h6 className="logo">
        <NavLink className="logo__link link" to="/">
          NewsExplorer
        </NavLink>
      </h6>
    }
    </>
    
  );
}

export default Logo;