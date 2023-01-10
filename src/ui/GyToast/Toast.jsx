import React, { useEffect } from "react";
import { TIME, TYPE, useToast } from "./ToastProvider";
import { transition } from "../../helper/animation";
// import motion
import { motion } from "framer-motion";
// import icons

import { AiFillCheckCircle } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";
import { FiDelete } from "react-icons/fi";

import "./index.scss";

const Toast = ({ children, id, time, type }) => {
  const { removeToast } = useToast();

  const removeTime = time ? TIME[time] || time : null;

  const ToastIcon = () => {
    switch (type) {
      case TYPE.SUCCESS:
        return <AiFillCheckCircle className="text-lg" />;
      default:
        return <RiErrorWarningFill className="text-lg" />;
    }
  };

  useEffect(() => {
    if (removeTime) {
      const timer = setTimeout(() => {
        removeToast(id);
      }, removeTime);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [id, removeToast, removeTime]);

  return (
    <motion.div
      initial={{ opacity: 0, y: "80%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "80%" }}
      transition={transition}
      className={`flex items-center gap-2 mb-4 mr-4 min-w-[200px] w-fit p-4 border rounded-md shadow-md ${type}`}
    >
      <ToastIcon />
      <div className="flex-1">{children}</div>
      {!removeTime && (
        <button onClick={() => removeToast(id)} className="text-lg">
          <FiDelete />
        </button>
      )}
    </motion.div>
  );
};

export default Toast;
