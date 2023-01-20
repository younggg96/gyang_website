import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import Logo from "../../img/header/logo.png";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import GyPopup from "../../ui/GyPopup";
import useAuth from "../../hooks/useAuth";

const UserInfo = () => {
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
    <div className="relative">
      <div className="hidden xl:flex min-w-[120px] w-[200px] items-center justify-end mx-4 cursor-pointer">
        {!isAuth ? (
          <Link to={"/auth"}>Sign in</Link>
        ) : (
          <div className="flex items-center" onClick={() => setOpen(true)}>
            <FiUser className="text-lg mr-2 text-gray-500 w-8" />
            <h4 className="overflow-hidden text-ellipsis whitespace-nowrap hover:underline underline-offset-2">
              {user?.username}
            </h4>
          </div>
        )}
      </div>
      <GyPopup open={open} setOpen={setOpen}>
        <section className="user-info-top flex flex-col p-4 items-center gap-4">
          <img
            // src={Logo}
            src={!user?.avatar ? Logo : user?.avatar}
            alt="user avatar"
            className="rounded-full w-16 h-16 border bg-black"
          />
          <div className="flex flex-col gap-1 w-full">
            <p className="text-md text-primary font-bold overflow-hidden text-ellipsis">
              {user?.username}
            </p>
            <p className="text-sm text-gray-500 overflow-hidden text-ellipsis">
              {user?.email}
            </p>
          </div>
        </section>
        <section className="user-info-btns border-t-2 border-b-2">
          <ul className="w-full">
            <li className="hover:bg-gray-100 py-2 pl-6 cursor-pointer flex items-center gap-3">
              <CgProfile /> Profile
            </li>
            <li className="hover:bg-gray-100 py-2 pl-6 cursor-pointer flex items-center gap-3">
              <IoMdSettings />
              Settings
            </li>
          </ul>
        </section>
        <section className="flex justify-center py-2 px-4 my-2">
          <button
            onClick={signout}
            className="signout-btn border w-full rounded-full px-4 py-2 text-primary hover:bg-gray-500 hover:text-white transition-all"
          >
            Sign Out
          </button>
        </section>
      </GyPopup>
    </div>
  );
};

export default UserInfo;
