import React from "react";
import "./index.scss";
import classNames from "classnames";

const GyInput = ({
  className,
  onInputHandler,
  form,
  hasError = false,
  errorMsg = "",
  ...props
}) => {
  return (
    <div className={classNames("gy-input", className)}>
      <input
        onInput={(event) => {
          event.preventDefault();
          onInputHandler && onInputHandler(event.target.value);
        }}
        {...form}
        {...props}
      />
      {hasError && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
};

export default GyInput;
