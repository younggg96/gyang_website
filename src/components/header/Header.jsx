import React, { useRef, useState } from "react";
// import components
import UserPopup from "../user/UserPopup"
// import Socials from "./Socials";
import Logo from "../../img/header/logo.png";
// import link
import { Link } from "react-router-dom";
// import motion
import { motion } from "framer-motion";
// import icons
import { CgMenuRight } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
// hooks
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { switchTheme } from "../../helper/theme";
import { useToggle } from "ahooks";
// scss
import "./index.scss";

const Links = [
  { name: "Home", link: "/home" },
  { name: "Home", link: "/home" },
];

// desktop
const DesktopHeader = () => {
  const [state, { toggle }] = useToggle();
  const changeToDark = () => {
    toggle();
    switchTheme(state ? "dark" : "light");
  };
  return (
    <div className="header-content">
      {/* logo */}
      <Link to={"/"} className="logo">
        <img src={Logo} alt="logo" />
        <h3 className="logo-text">CodeFish</h3>
      </Link>
      {/* nav - initially hidden - show on desktop mode */}
      <nav className="links hidden lg:block">
        <ul>
          {Links.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button onClick={changeToDark}>{state ? "dark" : "light"}</button>
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
    <nav className="text-text xl:hidden">
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
        className="bg-white shadow-2xl w-full absolute z-20 top-0 right-0 max-w-xs h-screen"
        ref={clickOutsideRef}
      >
        {/* icon */}
        <div
          onClick={() => setOpenMenu(false)}
          className="text-4xl absolute z-30 left-4 top-14 text-text cursor-pointer"
        >
          <IoMdClose />
        </div>
        {/* menu list */}
        <ul className="h-full flex flex-col justify-center items-center gap-y-8 text-text font-primary  font-bold text-3xl">
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
      <UserPopup />
      {/* mobile nav */}
      {/* <MobileHeader /> */}
    </header>
  );
};

export default Header;
