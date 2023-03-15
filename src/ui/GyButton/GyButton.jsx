import React from "react";
import classNames from "classnames";
import "./index.scss";

const GyButton = ({
  children,
  click,
  type = "button",
  size = ["normal"],
  icon,
  className,
  ...props
}) => {
  return (
    <button
      className={classNames("gy-button", ...size, className, icon && "icon")}
      type={type}
      onClick={click}
      {...props}
    >
      {icon && icon()}
      {children}
    </button>
  );
};

export default GyButton;
