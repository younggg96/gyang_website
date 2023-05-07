import React from "react";
import "./index.scss";

const GyLoader = ({ type = "normal" }) => {
  if (type === "ripple") {
    return (
      <div className="loader-ripple">
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <div className="loader-wapper">
      <div className="loader"></div>
    </div>
  );
};

export default GyLoader;
