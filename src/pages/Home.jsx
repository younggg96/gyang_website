import React, { useContext } from "react";
// // import images
// import WomanImg from "../img/home/woman.png";
// import link
import { Link } from "react-router-dom";
// import motion
import { motion } from "framer-motion";
// import transition
import { transition } from "../helper/animation";
import ArticleList from "../components/article/ArticleList";
import TopUserList from "../components/user/TopUserList";
import GyPagination from "../ui/GyPagination/GyPagination";
// cursor context
// import { CursorContext } from "../context/CursorContext";
// import { TIME, TYPE, useToast } from "../ui/GyToast/ToastProvider";

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
      <div className="container mx-auto flex flex-col-reverse md:flex-row gap-4">
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
        <section className="flex-1">
          <ArticleList page={1} />
        </section>
        <section className="w-[300px]">
          <TopUserList row={5} page={1} />
        </section>
        {/* </motion.div> */}
      </div>
    </motion.section>
  );
};

export default Home;
