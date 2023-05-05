import React from "react";
import "./index.scss";
import classNames from "classnames";

const GyInput = ({
  className,
  onInputHandler,
  required = false,
  form,
  ...props
}) => {
  return (
    <input
      className={classNames("gy-input", className)}
      onInput={(event) => {
        event.preventDefault();
        onInputHandler && onInputHandler(event.target.value);
      }}
      required={required}
      {...form}
      {...props}
    />
  );
};

export default GyInput;
