import React from "react";
import classNames from "classnames";
import "./index.scss";

const GyButton = ({
  children,
  click,
  type = "button",
  size = ["normal"],
  icon,
  loading = false,
  className,
  ...props
}) => {
  return (
    <>
      {!loading ? (
        <button
          className={classNames(
            "gy-button",
            ...size,
            className,
            icon && "icon"
          )}
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
