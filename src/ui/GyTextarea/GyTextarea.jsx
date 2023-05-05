import classNames from "classnames";
import React from "react";
import "./index.scss";

const GyTextarea = ({
  id,
  rows = 4,
  placeholder,
  required = false,
  className,
  hideLabel = "Input",
  hasBorder = true,
  form,
  ...props
}) => {
  return (
    <div className={classNames(["gy-textarea", className])}>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className={classNames({ hasBorder: hasBorder })}
        {...form}
        {...props}
      ></textarea>
      <label htmlFor={id} className="sr-only">
        {hideLabel}
      </label>
    </div>
  );
};

export default GyTextarea;
