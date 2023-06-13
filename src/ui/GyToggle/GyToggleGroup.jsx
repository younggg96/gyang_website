import classNames from "classnames";
import React from "react";
import "./index.scss";

const GyToggleGroup = ({ children, className }) => {
  return (
    <div className={classNames(["gy-toggle-group", className])}>
      <div className="gy-toggle-group__wapper">{children}</div>
    </div>
  );
};

export default GyToggleGroup;
