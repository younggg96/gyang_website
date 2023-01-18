import React from "react";
import Moment from "react-moment";

const GyTime = ({ date }) => {
  return <Moment fromNow>{date}</Moment>;
};

export default GyTime;
