import React from "react";
import "./index.scss";
import classNames from "classnames";

const GyCard = ({ title, children, className, ...props }) => {
  return (
    <div className={classNames("gy-card", className)} {...props}>
      {title && (
        <>
          <header className="header-title title">{title}</header>
          <hr />
        </>
      )}
      {children}
    </div>
  );
};

export default GyCard;
