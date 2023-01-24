import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import Logo from "../../img/header/logo.png";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import GyPopup from "../../ui/GyPopup";
import useAuth from "../../hooks/useAuth";

import "./index.scss";

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
          <img
            src={!user?.avatar ? Logo : user?.avatar}
            alt="user avatar"
            className="rounded-full w-16 h-16 border bg-black"
          />
          <div className="flex flex-col gap-1 w-full">
            <p className="text-md text-text font-bold overflow-hidden text-ellipsis">
              {user?.username}
            </p>
            <p className="text-sm text-gray-500 overflow-hidden text-ellipsis">
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
          <button onClick={signout}>Sign Out</button>
        </section>
      </GyPopup>
    </div>
  );
};

export default UserPopup;
