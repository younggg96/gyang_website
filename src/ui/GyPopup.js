import React, { useRef } from "react";
import { motion } from "framer-motion";
import useOnClickOutside from "../hooks/useOnClickOutside";

const variants = {
  hidden: {
    y: -5,
    opacity: 0,
  },
  show: {
    y: 10,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.9],
    },
  },
};

const GyPopup = ({ open, setOpen, children }) => {
  const clickOutsideRef = useRef();
  useOnClickOutside(clickOutsideRef, () => setOpen(false));

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={open ? "show" : ""}
    >
      <section ref={clickOutsideRef} className="gy-popup top-[calc(100%+.5rem)] left-8 absolute w-[calc(100%-2rem)] min-h-min border border-slate-300 bg-white shadow-md rounded-lg">
        {children}
      </section>
    </motion.div>
  );
};

export default GyPopup;
