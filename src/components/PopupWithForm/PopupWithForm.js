import { useEffect, useRef } from "react";

import Popup from '../Popup/Popup';

import '../Button/Button.css';
import './PopupWithForm.css';


function PopupWithForm({ isOpen, onClose, onSubmit, onReset, name, heading, children }) {

  const formRef = useRef();

  useEffect(() => {
    if(!isOpen) formRef.current.reset();
  }, [isOpen]);


  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form ref={formRef} name={`${name}-form`} className={`popup__form form form_name_${name}`} 
        onSubmit={onSubmit} 
        onReset={() => setTimeout(() => { onReset && onReset(); }, 200)}>
        
        <h4 className="popup__heading form__heading">{heading}</h4>
        
        {children}

      </form>
    </Popup>
  );
  
}

export default PopupWithForm;