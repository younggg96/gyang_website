import React from "react";
import "./index.scss";
import classNames from "classnames";

const GyTextarea = ({ children, className, ...props }) => {
  return (
    // <textarea className={classNames("gy-textarea", className)} {...props} />
    <div className={classNames("gy-textarea", className)} {...props}>
      <div class="auto-input" contenteditable="true" id="auto-input"></div>
    </div>
  );
};

export default GyTextarea;
