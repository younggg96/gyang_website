import React, { useState } from "react";
import "./index.scss";
import classNames from "classnames";
import { BiSun, BiMoon } from "react-icons/bi";
import { useToggle } from "ahooks";
import { switchTheme } from "../../helper/theme";

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
  const [state, { toggle }] = useToggle();
  const onClickHandler = () => {
    toggle();
    switchTheme(state ? "dark" : "light");
  };
  const color = state ? "#fdfdfe" : "";
  return (
    <div
      className={classNames("gy-switch-btn", { active: state })}
      onClick={onClickHandler}
    >
      <div
        className={classNames("gy-switch-btn-slider-theme", { active: state })}
      >
        {!state ? <BiMoon color={color} /> : <BiSun color={color} />}
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { GyThemeSwitchBtn, GySwitchBtn };
