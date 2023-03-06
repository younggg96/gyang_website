import React from "react";
import "./index.scss";
import classNames from "classnames";

const GyTextarea = ({ children, className, ...props }) => {
  return (
    <textarea className={classNames("gy-textarea", className)} {...props} />
  );
};

export default GyTextarea;
