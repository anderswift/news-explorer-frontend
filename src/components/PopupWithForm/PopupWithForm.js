import { useEffect, useRef } from "react";

import closeIcon from '../../images/menu-icon.svg';

import '../Button/Button.css';
import './PopupWithForm.css';


function PopupWithForm({ isOpen, onClose, onSubmit, onReset, name, heading, children }) {

  const formRef = useRef();

  const closeOnClickAway = (e) => { 
    if (!formRef.current.contains(e.target)) onClose();
  }

  useEffect(() => {
    if(!isOpen) formRef.current.reset();
  }, [isOpen]);


  return (
    <div className={`popup ${isOpen ? 'popup_open' : ''}`} onClick={closeOnClickAway} >
      <form ref={formRef} name={`${name}-form`} className={`popup__form form form_${name}`} 
        onSubmit={onSubmit} 
        onReset={() => setTimeout(() => { onReset && onReset(); }, 200)}>
        
        <h4 className="form__heading">{heading}</h4>
        
        {children}
        
        <button type="reset" className="popup__exit button" aria-label="Close form" onClick={onClose}>
          <svg className="popup__exit-icon">
            <use xlinkHref={`${closeIcon}#close`}></use>
          </svg>
        </button>

      </form>
    </div>
  );
  
}

export default PopupWithForm;