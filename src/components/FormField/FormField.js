import './FormField.css';

function FormField({ name, label, description, type, minMax, value, error, handleChange, focusOnOpen = false }) {

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
        required />
      <span className={`form__error${error ? ' form__error_active' : ''}`}>{error}</span>
    </>
  );
}

export default FormField;
