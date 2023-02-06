import React from "react";
import classNames from "classnames";
import "./index.scss";

const GyButton = ({
  children,
  click,
  size = "normal",
  className,
  ...props
}) => {
  return (
    <button
      className={classNames("gy-button", size, className)}
      onClick={click}
      {...props}
    >
      {children}
    </button>
  );
};

export default GyButton;
