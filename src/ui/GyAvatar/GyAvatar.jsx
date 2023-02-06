import React from "react";
import classNames from "classnames";
import "./index.scss";

const GyAvatar = ({ src, className, ...props }) => {
  return (
    <img
      className={classNames("gy-avatar", className)}
      {...props}
      src={src}
      alt="gy-avatar"
    />
  );
};

export default GyAvatar;
