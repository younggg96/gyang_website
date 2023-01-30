import React, { useState } from "react";
import "./index.scss";
import classNames from "classnames";

const GySwitchBtn = () => {
  const [active, setActive] = useState(false);
  const onClickHandler = () => {
    setActive(!active);
  };
  return (
    <div
      className={classNames("gy-switch-btn", { active: active })}
      onClick={onClickHandler}
    >
      <div
        className={classNames("gy-switch-btn-slider", { active: active })}
      ></div>
    </div>
  );
};

const GyThemeSwitchBtn = () => {
  const [active, setActive] = useState(false);
  const onClickHandler = () => {
    setActive(!active);
  };
  return (
    <div
      className={classNames("gy-switch-btn", { active: active })}
      onClick={onClickHandler}
    >
      <div
        className={classNames("gy-switch-btn-slider", { active: active })}
      ></div>
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { GyThemeSwitchBtn, GySwitchBtn };
