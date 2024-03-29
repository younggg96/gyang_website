import React, { useState } from "react";
// default avatar img
import defaultAvatar from "../../assets/imgs/avatar/default-avatar.jpg";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
// style
import "./index.scss";
// icons
import { FiUser } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
// components
import GyPopup from "../../ui/GyPopup";
import GyAvatar from "../../ui/GyAvatar/GyAvatar";
import GyButton from "../../ui/GyButton/GyButton";

const UserPopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { state, logout } = useAuth();
  const { isAuth, user } = state;
  const navigateTo = (url) => {
    navigate(url);
    setOpen(false);
  };
  const signout = () => {
    setOpen(false);
    setTimeout(() => {
      logout();
    }, 500);
  };
  const avatar = user?.avatar || defaultAvatar;
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
        <div className="user-info-popup-wapper">
          <section className="top">
            <GyAvatar src={avatar} className="avatar" />
            <div className="text">
              <p className="username">{user?.username}</p>
              <p className="email">{user?.email}</p>
            </div>
          </section>
          <section className="btns">
            <ul>
              <li onClick={() => navigateTo("profile/" + user?.id)}>
                <CgProfile /> Profile
              </li>
              <li>
                <IoMdSettings />
                Settings
              </li>
            </ul>
          </section>
          <section className="signout">
            <GyButton onClick={signout} className="sign-out-btn" size={["sm"]}>
              Sign Out
            </GyButton>
          </section>
        </div>
      </GyPopup>
    </div>
  );
};

export default UserPopup;
