
import { useState } from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm';
import FormField from '../FormField/FormField';


function FormLogin({isOpen, isSaving, onClose, onSubmit, openRegisterPopup}) {

  const defaultValues = { email: '', password: '' };
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [submitReady, setSubmitReady] = useState(false);


  function handleChange(e) {
    const name = e.target.name.split('-').pop();
    setValues({...values, [name]: e.target.value });
    
    if(e.target.validity.valid) {
      const updatedErrors= {...errors, [name]: '' }
      setErrors(updatedErrors);
      if(values.email !== '' && values.password !== '')
        setSubmitReady(!Object.values(updatedErrors).some(i => i)); // enable submit if no error messages
    } else {
      setErrors({...errors, [name]: e.target.validationMessage });
      setSubmitReady(false);
    }
  } 

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values)
    .catch(() => {
      setValues({...values, password: '' });
      setSubmitReady(false);
    });
  }

  const handleReset = () => {
    setValues(defaultValues); // prevent undefined value on controlled form field
    setErrors({});
    setSubmitReady(false);
  }

  
  return (
    <PopupWithForm heading="Sign In" name="login" isOpen={isOpen} onClose={onClose} onReset={handleReset}
      onSubmit={handleSubmit}>

      <FormField name="login-email" minMax={[5, 320]} handleChange={handleChange} focusOnOpen={isOpen}
        value={values.email} error={errors.email} type="email" label="Email" description="Enter email" />

      <FormField name="login-password" minMax={[10, 256]} handleChange={handleChange} 
        value={values.password} error={errors.password} type="password" label="Password" description="Enter password" />

      <button type="submit" className={`button button_type_submit form__submit${!submitReady ? ' button_disabled' : ''}`} 
        name="login-submit" disabled={!submitReady}>{isSaving ? 'Loading...' : 'Sign In'}</button>
      
      <p className="form__alt">
        or <button type="button" className="form__link button button_link" onClick={openRegisterPopup}>Sign up</button>
      </p>
      
    </PopupWithForm>
  );
  
}

export default FormLogin;
