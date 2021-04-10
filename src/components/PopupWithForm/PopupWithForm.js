import { useEffect, useRef } from "react";

import closeIcon from '../../images/menu-icon.svg';

import '../Button/Button.css';
import './PopupWithForm.css';


function PopupWithForm(props) {

  const formRef = useRef();


  const resetOnEsc= (e) => { 
    if(e.key === 'Escape') formRef.current.reset();
  }


  useEffect(() => {
    if(props.isOpen) document.addEventListener('keyup', resetOnEsc);
    else document.removeEventListener('keyup', resetOnEsc);
  }, [props.isOpen]);


  return (
    <div className={`popup ${props.isOpen ? 'popup_open' : ''}`}>
      <form ref={formRef} name={`${props.name}-form`} className={`popup__form form form_${props.name}`} 
        onSubmit={props.onSubmit} 
        onReset={() => setTimeout(() => { props.onReset && props.onReset(); }, 200)}>
        
        <h4 className="form__heading">{props.heading}</h4>
        
        {props.children}
        
        <button type="reset" className="popup__exit button" aria-label="Close" onClick={props.onClose}>
          <svg className="popup__exit-icon">
            <use xlinkHref={`${closeIcon}#close`}></use>
          </svg>
        </button>

      </form>
    </div>
  );
  
}

export default PopupWithForm;