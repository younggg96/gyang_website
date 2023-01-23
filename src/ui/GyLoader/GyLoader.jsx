import React from "react";
import "./index.scss";

const GyLoader = () => {
  return (
    <div className="h-[160px] flex items-center justify-center">
      <div className="loader animate-loader before:animate-loader after:animate-loader"></div>
    </div>
  );
};

export default GyLoader;
