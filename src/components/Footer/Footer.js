import { NavLink } from 'react-router-dom';

import './Footer.css';
import githubIcon from '../../images/github.svg';
import facebookIcon from '../../images/facebook.svg';

function Footer() {
  return (
    <footer className="footer">
      

      <ul className="footer__menu-list list-reset">

        <li className="footer__menu-item"><NavLink to="/" className="footer__menu-link">Home</NavLink></li>

        <li className="footer__menu-item">
          <a href="https://practicum.yandex.com/" className="footer__menu-link" target="_blank" rel="noreferrer">
            Practicum by Yandex
          </a>
        </li>

      </ul>

      <ul className="footer__menu-list footer__menu-list_icon list-reset">

        <li className="footer__menu-item footer__menu-item_icon">
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <img src={githubIcon} alt="Github" className="footer__icon" />
          </a>
        </li>

        <li className="footer__menu-item footer__menu-item_icon">
          <a href="https://facebook.com/" target="_blank" rel="noreferrer">
            <img src={facebookIcon} alt="Facebook" className="footer__icon" />
          </a>
        </li>

      </ul>

      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>

    </footer>
  );
}

export default Footer;