import classNames from "classnames";
import React from "react";
import "./index.scss";

const GyToggle = ({ className, click, active, children }) => {
  return (
    <div
      className={classNames(["gy-toggle", className, { active }])}
      onClick={click}
    >
      {children}
    </div>
  );
};

export default GyToggle;
