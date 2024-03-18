import React from "react";
import classNames from "classnames";
import "./index.scss";

const GyAvatar = ({ src, className, size = "normal", hasBadge = false, badge = 4, ...props }) => {
  return (
    <div
      className={classNames([
        className,
        "gy-avatar",
        { sm: size === "sm", lg: size === "lg", xl: size === "xl", full: size === "full" },
      ])}
    >
      {hasBadge && <div className="gy-avatar__badge">{badge}</div>}
      <img src={src} alt="avatar" {...props}/>
    </div>
  );
};

export default GyAvatar;
