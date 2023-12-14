import React from "react";
import classNames from "classnames";
import "./index.scss";

const GyButton = ({
  children,
  click,
  type = "button",
  size = ["normal"],
  variant = "outlined",
  icon,
  loading = false,
  className,
  height,
  width,
  style,
  ...props
}) => {
  return (
    <>
      {!loading ? (
        <button
          className={classNames(
            "gy-button",
            ...size,
            icon && "icon",
            variant,
            className
          )}
          style={{ height: height, width: width, ...style }}
          type={type}
          onClick={click}
          {...props}
        >
          {icon && icon()}
          {children}
        </button>
      ) : (
        <button
          className={classNames(
            "gy-button",
            ...size,
            className,
            variant,
            icon && "icon"
          )}
          {...props}
        >
          Loading...
        </button>
      )}
    </>
  );
};

export default GyButton;
