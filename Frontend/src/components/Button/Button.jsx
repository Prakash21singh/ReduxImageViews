import React from "react";
import "./style.scss";
const Button = ({ onClick, text, width, padding, type }) => {
  return (
    <div className="buttonComponent">
      <button
        style={{ width: width, padding: padding }}
        onClick={onClick}
        type={type || ""}>
        {text || "Click me"}
      </button>
    </div>
  );
};

export default Button;
