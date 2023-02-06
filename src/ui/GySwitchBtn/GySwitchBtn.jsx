import React, { useEffect, useState } from "react";
import "./index.scss";
import classNames from "classnames";
import { BiSun, BiMoon } from "react-icons/bi";
import { useToggle } from "ahooks";
import { getTheme, switchTheme } from "../../helper/theme";

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
  const [state, { toggle, set }] = useToggle("light", "dark");
  const onClickHandler = () => {
    toggle();
    switchTheme(state);
  };
  const color = state === "dark" ? "#fdfdfe" : "";

  useEffect(() => {
    set(getTheme() === "dark" ? "light" : "dark");
  }, []);

  return (
    <div
      className={classNames("gy-switch-btn", { active: state === "dark" })}
      onClick={onClickHandler}
    >
      <div
        className={classNames("gy-switch-btn-slider-theme", {
          active: state === "dark",
        })}
      >
        {state === "light" ? <BiMoon color={color} /> : <BiSun color={color} />}
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { GyThemeSwitchBtn, GySwitchBtn };
