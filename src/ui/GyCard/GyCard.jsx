import React from "react";
import "./index.scss";
import classNames from "classnames";

const GyCard = ({
  title,
  children,
  className,
  hasDivider = true,
  ...props
}) => {
  return (
    <div className={classNames("gy-card", className)} {...props}>
      {!!title && (
        <>
          <header
            className={classNames([
              "header-title title",
              { "no-divider": !hasDivider },
            ])}
          >
            {title}
          </header>
          {hasDivider && <hr />}
        </>
      )}
      {children}
    </div>
  );
};

export default GyCard;
