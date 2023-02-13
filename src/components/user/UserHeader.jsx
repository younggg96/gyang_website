import React from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/imgs/default-avatar.jpg";

import GyAvatar from "../../ui/GyAvatar/GyAvatar";

const UserHeader = ({ user, size = "normal" }) => {
  const avatar = user?.avatar || defaultAvatar;

  return (
    <div className="user-info-header">
      {size === "sm" && (
        <section className="user-info-header-sm">
          <div className="user-content">
            <GyAvatar src={avatar} alt={user?.username + "-avatar"} />
            <Link to={`/profile/${user?.id}`} className="link">
              {user?.username}
            </Link>
          </div>
          {user?.articles && (
            <div className="article-num">
              {user?.articles?.length > 99 ? "99+" : user?.articles?.length}
            </div>
          )}
        </section>
      )}
      {size === "lg" && (
        <section className="user-info-header-lg">
          <div className="user-avatar">
            <img src={avatar} alt={user?.username + "-avatar"} />
          </div>
          <p className="title">{user?.username}</p>
        </section>
      )}
      {size === "normal" && (
        <section className="user-info-header-normal">
          <GyAvatar
            className="avatar"
            src={avatar}
            alt={user?.username + "-avatar"}
          />
          <Link to={`/profile/${user?.id}`} className="link title">
            {user?.username}
          </Link>
        </section>
      )}
    </div>
  );
};

export default UserHeader;
