import React from "react";
import "./index.scss";
import classNames from "classnames";

const Gytab = ({ data, activeIndex, setActiveIndex, mobile, children, className,...props }) => {
  return (
    <>
      <ul className={classNames([{ "gy-tab": !mobile, "gy-tab-mobile": mobile }, className])} {...props}>
        {data.map((item, index) => {
          return (
            <li
              title={item}
              className={classNames({ title: activeIndex === index })}
              key={index}
              onClick={() => setActiveIndex(index)}
            >
              {item}
            </li>
          );
        })}
      </ul>
      {children}
    </>
  );
};

export default Gytab;
