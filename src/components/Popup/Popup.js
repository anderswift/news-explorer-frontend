import { useRef } from "react";

import './Popup.css';

import closeIcon from '../../images/menu-icon.svg';


function Popup({ isOpen, onClose, children }) {

  const modalRef = useRef();


  const closeOnClickAway = (e) => { 
    if (!modalRef.current.contains(e.target)) onClose();
  }


  return (
    <div className={`popup ${isOpen ? 'popup_open' : ''}`} onClick={closeOnClickAway} >
      <div ref={modalRef}  className='popup__modal'>

      {children}

      <button type="button" className="popup__exit button" aria-label="Close form" onClick={onClose}>
        <svg className="popup__exit-icon">
          <use xlinkHref={`${closeIcon}#close`}></use>
        </svg>
      </button>
      </div>
    </div>
  );
}

export default Popup;