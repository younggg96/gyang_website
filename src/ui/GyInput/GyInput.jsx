import React from "react";
import "./index.scss";
import classNames from "classnames";

const GyInput = ({ className, onInputHandler, form, ...props }) => {
  return (
    <input
      className={classNames("gy-input", className)}
      onInput={(event) => {
        event.preventDefault();
        onInputHandler && onInputHandler(event.target.value);
      }}
      {...form}
      {...props}
    />
  );
};

export default GyInput;
