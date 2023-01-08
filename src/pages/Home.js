import React, { useContext } from "react";
// import images
import WomanImg from "../img/home/woman.png";
// import link
import { Link } from "react-router-dom";
// import motion
import { motion } from "framer-motion";
// import transition
import { transition } from "../helper/animation"
// cursor context
import { CursorContext } from "../context/CursorContext";

const Home = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
      className="section"
    >
      <div className="container mx-auto">
        {/* <motion.div
          initial={{ opacity: 0, y: "-50%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-50%" }}
          transition={transition}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        > */}
          <h1 className="h1">sssaaa</h1>
        {/* </motion.div> */}
      </div>
    </motion.section>
  );
};

export default Home;
