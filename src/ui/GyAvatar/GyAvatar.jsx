import React from "react";
import classNames from "classnames";
import "./index.scss";

const GyAvatar = ({ src, className, size = "normal", ...props }) => {
  return (
    <img
      className={classNames([className, "gy-avatar", { sm: size === "sm" }])}
      {...props}
      src={src}
      alt="gy-avatar"
    />
  );
};

export default GyAvatar;
