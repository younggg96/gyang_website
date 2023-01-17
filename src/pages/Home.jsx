import React, { useContext } from "react";
// // import images
// import WomanImg from "../img/home/woman.png";
// import link
import { Link } from "react-router-dom";
// import motion
import { motion } from "framer-motion";
// import transition
import { transition } from "../helper/animation";
// cursor context
// import { CursorContext } from "../context/CursorContext";
// import { TIME, TYPE, useToast } from "../ui/GyToast/ToastProvider";
import ArticleList from "../components/home/ArticleList";

const Home = () => {
  // const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
  // const { addToast } = useToast();
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
      className="pt-[100px]"
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
        {/* <h1 className="h1">
          <button
            onClick={() =>
              addToast({ content: "3", type: TYPE.SUCCESS })
            }
          >
            click
          </button>
        </h1> */}
        <ArticleList page={1} />
        {/* </motion.div> */}
      </div>
    </motion.section>
  );
};

export default Home;
