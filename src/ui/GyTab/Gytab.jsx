import React from "react";
import "./index.scss";
import classNames from "classnames";

const Gytab = ({
  data,
  activeIndex,
  setActiveIndex,
  mobile,
  children,
  className,
  ...props
}) => {
  return (
    <>
      <ul
        className={classNames([
          { "gy-tab": !mobile, "gy-tab-mobile": mobile },
          className,
        ])}
        {...props}
      >
        {data.map((item, index) => {
          return (
            <li
              title={item}
              className={classNames({ title: activeIndex === index })}
              key={index}
              role={"tab-" + index}
              onClick={() => setActiveIndex(index)}
            >
              {item}
            </li>
          );
        })}
        <div
          className="underline"
          style={{ transform: `translateX(${activeIndex * 120}px)` }}
        ></div>
      </ul>
      {children}
    </>
  );
};

export default Gytab;
