import { useEffect, useRef } from "react";

import './FormField.css';

function FormField({ name, label, description, type, minMax, value, error, handleChange, focusOnOpen = false }) {

  const fieldRef = useRef(); // for focus only

  useEffect(() => {
    if(focusOnOpen && fieldRef.current) fieldRef.current.focus();
  }, [focusOnOpen, fieldRef]);
  
  return (
    <>
      <label className="form__label">{label}</label>
      <input 
        type={type === undefined ? 'text' : type} 
        name={name}
        id={name} 
        className={`form__field${error ? ' form__field_type_error': ''}`} 
        aria-label={label} 
        placeholder={description} 
        minLength={minMax ? minMax[0] : undefined}
        maxLength={minMax ? minMax[1] : undefined} 
        value={value} 
        onChange={handleChange}
        autoComplete={type === 'password' ? `news-explorer ${name}` : ''}
        ref={fieldRef}
        required />
      <span className={`form__error${error ? ' form__error_active' : ''}`}>{error}</span>
    </>
  );
}

export default FormField;
