
import { useState } from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm';
import FormField from '../FormField/FormField';


function FormRegister({ isOpen, isSaving, onClose, onSubmit, openLoginPopup, errorMessage, clearErrorMessage }) {
  
  const defaultValues = { email: '', name: '', password: '' };
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [submitReady, setSubmitReady] = useState(false);


  function handleChange(e) {
    if(errorMessage !== '') clearErrorMessage();
    const name = e.target.name.split('-').pop();
    setValues({...values, [name]: e.target.value });
    
    if(e.target.validity.valid) {
      const updatedErrors= {...errors, [name]: '' }
      setErrors(updatedErrors);
      if(values.email !== '' && values.name !== '' && values.password !== '')
        setSubmitReady(!Object.values(updatedErrors).some(i => i)); // enable submit if no error messages
    } else {
      setErrors({...errors, [name]: e.target.validationMessage });
      setSubmitReady(false);
    }
  } 

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  const handleReset = () => {
    setValues(defaultValues); // prevent undefined value on controlled form field
    setErrors({});
    setSubmitReady(false);
  }
  
  
  return (
    <PopupWithForm heading="Sign Up" name="register" isOpen={isOpen} onClose={onClose} onReset={handleReset}
      onSubmit={handleSubmit}>

      <FormField name="register-email" minMax={[5, 320]} handleChange={handleChange} focusOnOpen={isOpen} 
        value={values.email} error={errors.email} type="email" label="Email" description="Enter your email" />

      <FormField name="register-password" minMax={[10, 256]} handleChange={handleChange} 
        value={values.password} error={errors.password} type="password" label="Password" description="Enter password" />

      <FormField name="register-name" minMax={[2, 40]} handleChange={handleChange} 
        value={values.name} error={errors.name} label="Username" description="Enter your username" />

      {errorMessage ? 
        <p className="form__error form__error_type_submission form__error_active">
          {errorMessage}
        </p> 
        :
        null
      }

      <button type="submit" className={`button button_type_submit form__submit${!submitReady ? ' button_disabled' : ''}`} 
        name="register-submit" disabled={!submitReady}>{isSaving ? 'Loading...' : 'Sign Up'}</button>
      
      <p className="form__alt">
        or <button type="button" className="form__link button button_link" onClick={openLoginPopup}>Sign in</button>
      </p>
      
    </PopupWithForm>
  );
  
}

export default FormRegister;
