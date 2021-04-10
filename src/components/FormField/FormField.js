

import './FormField.css';

function FormField(props) {

  return (
    <>
      <label className="form__label">{props.label}</label>
      <input 
        type={props.type === undefined ? 'text' : props.type} 
        name={props.name}
        id={props.name} 
        className={`form__field${props.error ? ' form__field_type_error': ''}`} 
        aria-label={props.label} 
        placeholder={props.description} 
        minLength={props.minMax ? props.minMax[0] : undefined}
        maxLength={props.minMax ? props.minMax[1] : undefined} 
        value={props.value} 
        onChange={props.handleChange}
        autoComplete={props.type === 'password' ? `news-explorer ${props.name}` : ''}
        required />
      <span className={`form__error${props.error ? ' form__error_active' : ''}`}>{props.error}</span>
    </>
  );
}

export default FormField;
