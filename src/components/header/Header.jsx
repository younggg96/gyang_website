import React, { useContext, useRef, useState } from "react";
// import components
// import Socials from "./Socials";
import Logo from "../../img/header/logo.png";
// import link
import { Link } from "react-router-dom";
// import cursor context
import { CursorContext } from "../../context/CursorContext";
// import motion
import { motion } from "framer-motion";
// import icons
import { CgMenuRight } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
// hooks
import useOnClickOutside from "../../hooks/useOnClickOutside";
import UserInfo from "../auth/UserInfo";

const Links = [{ name: "Home", link: "/home" }];

// desktop
const DesktopHeader = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext);
  return (
    <div className="flex flex-col lg:flex-row lg:items-center w-full justify-between">
      {/* logo */}
      <Link
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        to={"/"}
        className="flex items-center"
      >
        <img src={Logo} alt="logo" className="max-w-[100px]" />
        <h3 className="font-bold text-lg text-gray-500">CodeFish</h3>
      </Link>
      {/* nav - initially hidden - show on desktop mode */}
      <nav
        className="hidden xl:flex gap-x-12 font-semibold"
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        {Links.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.link}
              className="text-[#696c6d] hover:text-primary transition"
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

// menu variants
const menuVariants = {
  hidden: {
    x: "100%",
  },
  show: {
    x: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.9],
    },
  },
};

// mobile
const MobileHeader = () => {
  const clickOutsideRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  useOnClickOutside(clickOutsideRef, () => setOpenMenu(false));
  return (
    <nav className="text-primary xl:hidden">
      {/* nav open button */}
      <div
        onClick={() => setOpenMenu(true)}
        className="text-3xl cursor-pointer"
      >
        <CgMenuRight />
      </div>
      {/* menu */}
      <motion.div
        variants={menuVariants}
        initial="hidden"
        animate={openMenu ? "show" : ""}
        className="bg-white shadow-2xl w-full absolute top-0 right-0 max-w-xs h-screen z-20"
        ref={clickOutsideRef}
      >
        {/* icon */}
        <div
          onClick={() => setOpenMenu(false)}
          className="text-4xl absolute z-30 left-4 top-14 text-primary cursor-pointer"
        >
          <IoMdClose />
        </div>
        {/* menu list */}
        <ul className="h-full flex flex-col justify-center items-center gap-y-8 text-primary font-primary  font-bold text-3xl">
          {Links.map((item, index) => {
            return (
              <Link key={index} to={item.link}>
                {item.name}
              </Link>
            );
          })}
        </ul>
      </motion.div>
    </nav>
  );
};

const Header = () => {
  return (
    <header className="header">
      <DesktopHeader />
      <UserInfo />
      {/* mobile nav */}
      {/* <MobileHeader /> */}
    </header>
  );
};

export default Header;
