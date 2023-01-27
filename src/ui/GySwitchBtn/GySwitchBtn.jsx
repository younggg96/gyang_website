import React, { useState } from "react";
import "./index.scss";
import classNames from "classnames";

const GySwitchBtn = () => {
  const [active, setActive] = useState(false);
  const onClickHandler = () => {
    setActive(!active);
  };
  return (
    <div className="gy-switch-btn" onClick={onClickHandler}>
      <div
        className={classNames("gy-switch-btn-slider", { active: active })}
      ></div>
    </div>
  );
};

export default GySwitchBtn;
