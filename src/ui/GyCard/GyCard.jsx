import React from "react";
import "./index.scss";

const GyCard = ({ title, children }) => {
  return (
    <div className="gy-card">
      <header className="title">{title}</header>
      <hr />
      {children}
    </div>
  );
};

export default GyCard;
