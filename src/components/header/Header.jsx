import React, { useRef, useState } from "react";
// import components
import UserPopup from "../user/UserPopup";
// import Socials from "./Socials";
import Logo from "../../assets/imgs/header/logo.png";
// import link
import { Link } from "react-router-dom";
// import motion
import { motion } from "framer-motion";
// import icons
import { CgMenuRight } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
// hooks
import useOnClickOutside from "../../hooks/useOnClickOutside";
// scss
import "./index.scss";
// ui
import GySwitchBtn from "../../ui/GySwitchBtn/GySwitchBtn";
import GyButton from "../../ui/GyButton/GyButton";

const Links = [
  { name: "Home", link: "/" },
  { name: "Home", link: "/" },
  { name: "Home", link: "/" },
];

// desktop
const DesktopHeader = () => {
  return (
    <div className="header-content">
      {/* logo */}
      <Link to={"/"} className="header-content__logo">
        <img src={Logo} alt="logo" />
        <h3 className="header-content__logo-text">CodeFish</h3>
      </Link>
      {/* nav - initially hidden - show on desktop mode */}
      <nav className="header-content__links">
        <ul>
          {Links.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
        <GySwitchBtn.GyThemeSwitchBtn />
      </nav>
    </div>
  );
};

// menu variants
const menuVariants = {
  closed: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      restDelta: 2,
    },
  },
  open: {
    x: "0%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

// mobile
const MobileHeader = () => {
  const clickOutsideRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  useOnClickOutside(clickOutsideRef, () => setOpenMenu(false));
  return (
    <div className="header-content-mobile">
      {/* mobile nav open button */}
      <GyButton
        className="header-content-mobile__open-menu-btn"
        icon={() => <CgMenuRight style={{ width: "22px", height: "22px" }} />}
        title="Open menu"
        variant="iconOnly"
        onClick={() => setOpenMenu(true)}
      ></GyButton>
      {/* mobile menu */}
      <motion.nav
        className="header-content-mobile__popup-menu"
        variants={menuVariants}
        initial="closed"
        animate={openMenu ? "open" : "closed"}
        ref={clickOutsideRef}
      >
        {/* mobile nav close button */}
        <GyButton
          className="header-content-mobile__close-menu-btn"
          icon={() => <IoMdClose style={{ width: "30px", height: "30px", color: "black" }} />}
          title="Close menu"
          variant="iconOnly"
          onClick={() => setOpenMenu(false)}
        ></GyButton>
        {/* mobile menu list */}
        <ul className="header-content-mobile__links">
          {Links.map((item, index) => {
            return (
              <Link key={index} to={item.link}>
                {item.name}
              </Link>
            );
          })}
        </ul>
      </motion.nav>
    </div>
  );
};

const Header = () => {
  return (
    <header className="header">
      {/* desktop header */}
      <DesktopHeader />
      {/* mobile header */}
      <MobileHeader />
      <UserPopup />
    </header>
  );
};

export default Header;
