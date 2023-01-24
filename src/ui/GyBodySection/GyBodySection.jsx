import React from "react";
// import motion
import { motion } from "framer-motion";
import { transition } from "../../helper/animation";
import "../../app.scss";

const GyBodySection = ({ children }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
      className="body-section"
    >
      {children}
    </motion.section>
  );
};

export default GyBodySection;
