import React from "react";
import "./index.scss";

const GyButton = ({ children, click }) => {
  return (
    <button className="gy-button btn-small" onClick={click}>
      {children}
    </button>
  );
};

export default GyButton;
