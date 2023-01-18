import React from "react";
import { Link } from "react-router-dom";

const UserHeader = ({ user }) => {
  return (
    <section className="article-user flex items-center gap-4">
      <img
        className="rounded-full w-12"
        src={user?.avatar}
        alt={user?.username + "avatar"}
      />
      <Link to={"/"} className="text-lg text-primary link">
        {user?.username}
      </Link>
    </section>
  );
};

export default UserHeader;
