import { NavLink } from 'react-router-dom';

import githubIcon from '../../images/github.svg';
import facebookIcon from '../../images/facebook.svg';

import '../Link/Link.css';
import '../List/List.css';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      
      <ul className="footer__menu-list list">

        <li className="footer__menu-item">
          <NavLink to="/" className="link footer__menu-link">Home</NavLink>
        </li>

        <li className="footer__menu-item">
          <a href="https://practicum.yandex.com/" className="link footer__menu-link" target="_blank" rel="noreferrer">
            Practicum by Yandex
          </a>
        </li>

      </ul>


      <ul className="footer__menu-list footer__menu-list_type_icon list">

        <li className="footer__menu-item footer__menu-item_type_icon">
          <a className="link footer__menu-link" href="https://github.com/" target="_blank" rel="noreferrer">
            <svg  className="footer__icon" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <use xlinkHref={`${githubIcon}#github`}></use>
            </svg>
          </a>
        </li>

        <li className="footer__menu-item footer__menu-item_type_icon">
          <a className="link footer__menu-link" href="https://facebook.com/" target="_blank" rel="noreferrer">
            <svg className="footer__icon" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <use xlinkHref={`${facebookIcon}#facebook`}></use>
            </svg>
          </a>
        </li>

      </ul>
      

      <p className="footer__copyright">
        © 2021 Supersite, Powered by News API
      </p>

    </footer>
  );
}

export default Footer;