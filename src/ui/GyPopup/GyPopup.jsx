import React, { useRef } from "react";
import { motion } from "framer-motion";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { variants } from "../../helper/animation";
import "./index.scss";

const GyPopup = ({ open, setOpen, children }) => {
  const clickOutsideRef = useRef();
  useOnClickOutside(clickOutsideRef, () => setOpen(false));

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={open ? "show" : ""}
    >
      <section ref={clickOutsideRef} className="gy-popup">
        {children}
      </section>
    </motion.div>
  );
};

export default GyPopup;
