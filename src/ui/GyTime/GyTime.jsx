import classNames from "classnames";
import React from "react";
import Moment from "react-moment";

const GyTime = ({ date, className, ...props }) => {
  return (
    <p className={classNames("gy-time", className)} {...props}>
      <Moment fromNow>{date}</Moment>
    </p>
  );
};

export default GyTime;
