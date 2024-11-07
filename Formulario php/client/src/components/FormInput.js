import React from 'react';

const FormInput = ({ className, type, value, onChange, placeholder, required }) => {
  return (
    <div>
      <input
        className={className}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormInput;
