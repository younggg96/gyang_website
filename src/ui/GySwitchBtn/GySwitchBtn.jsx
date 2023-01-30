import React, { useState } from "react";
import "./index.scss";
import classNames from "classnames";
import { BiSun, BiMoon } from "react-icons/bi";
import { getTheme } from "../../helper/theme";

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
  const color = active ? "#fdfdfe" : "";
  return (
    <div
      className={classNames("gy-switch-btn", { active: active })}
      onClick={onClickHandler}
    >
      <div
        className={classNames("gy-switch-btn-slider-theme", { active: active })}
      >
        {!active ? <BiMoon color={color} /> : <BiSun color={color} />}
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { GyThemeSwitchBtn, GySwitchBtn };
