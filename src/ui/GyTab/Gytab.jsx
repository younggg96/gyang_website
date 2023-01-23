import React from "react";
import "./index.scss";
import classNames from "classnames";

const Gytab = ({ data, activeIndex, setActiveIndex, children }) => {
  return (
    <>
      <ul className="gy-tab">
        {data.map((item, index) => {
          return (
            <li
              title={item}
              className={classNames("p-4", { title: activeIndex === index })}
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