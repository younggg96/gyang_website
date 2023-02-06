import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import Logo from "../../img/header/logo.png";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import GyPopup from "../../ui/GyPopup";
import useAuth from "../../hooks/useAuth";

import "./index.scss";
import GyAvatar from "../../ui/GyAvatar/GyAvatar";
import GyButton from "../../ui/GyButton/GyButton"

const UserPopup = () => {
  const [open, setOpen] = useState(false);
  const { state, logout } = useAuth();
  const { isAuth, user } = state;
  const signout = () => {
    setOpen(false);
    setTimeout(() => {
      logout();
    }, 500);
  };
  return (
    <div className="user-info-popup">
      <div className="user-info-popup-content">
        {!isAuth ? (
          <Link to={"/auth"} className="text">
            Sign in
          </Link>
        ) : (
          <div className="user-info" onClick={() => setOpen(true)}>
            <div className="user-icon">
              <FiUser />
            </div>
            <h4 className="username">{user?.username}</h4>
          </div>
        )}
      </div>
      <GyPopup open={open} setOpen={setOpen}>
        <section className="user-info-popup-top">
          <GyAvatar
            src={!user?.avatar ? Logo : user?.avatar}
            className="avatar"
          />
          <div className="text">
            <p className="username">
              {user?.username}
            </p>
            <p className="email">
              {user?.email}
            </p>
          </div>
        </section>
        <section className="user-info-popup-btns">
          <ul>
            <li>
              <CgProfile /> Profile
            </li>
            <li>
              <IoMdSettings />
              Settings
            </li>
          </ul>
        </section>
        <section className="user-info-popup-signout">
          <GyButton onClick={signout} className="sign-out-btn">Sign Out</GyButton>
        </section>
      </GyPopup>
    </div>
  );
};

export default UserPopup;
