import classNames from "classnames";
import React from "react";
import "./index.scss";

const GyTextarea = ({
  id,
  rows = 4,
  placeholder,
  className,
  hideLabel = "Input",
  hasBorder = true,
  form,
  hasError = false,
  errorMsg = "",
  ...props
}) => {
  return (
    <div className={classNames(["gy-textarea", className])}>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        className={classNames({ hasBorder: hasBorder })}
        {...form}
        {...props}
      ></textarea>
      {hasError && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
};

export default GyTextarea;
