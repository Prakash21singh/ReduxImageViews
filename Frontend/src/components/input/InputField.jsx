import React from "react";
import "./style.scss";
const InputField = ({ placeholder, type, value, onChange }) => {
  return (
    <div className="inputComponent">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
