import React from "react";
import "./index.scss";
import classNames from "classnames";

const GyInput = ({ children, className, ...props }) => {
  return <input className={classNames("gy-input", className)} {...props} />;
};

export default GyInput;
