import React from "react";
import { Link } from "react-router-dom";
// default avatar img
import defaultAvatar from "../../assets/imgs/avatar/default-avatar.jpg";
// ui
import GyAvatar from "../../ui/GyAvatar/GyAvatar";

const UserHeader = ({ user, size = "normal", hasAvatar = true, ...props }) => {
  const avatar = user?.avatar || defaultAvatar;

  return (
    <div className="user-info-header" {...props}>
      {size === "xs" && (
        <section className="user-info-header-xs">
          {hasAvatar && (
            <GyAvatar src={avatar} alt={user?.username + "-avatar"} size="sm" />
          )}
          <Link to={`/profile/${user?.id}`} className="link text-line-1">
            {user?.username}
          </Link>
        </section>
      )}
      {size === "sm" && (
        <section className="user-info-header-sm">
          <div className="user-content">
            {hasAvatar && (
              <GyAvatar src={avatar} alt={user?.username + "-avatar"} />
            )}
            <Link to={`/profile/${user?.id}`} className="link text-line-1">
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
            {hasAvatar && (
              <GyAvatar
                src={avatar}
                alt={user?.username + "-avatar"}
                size="full"
              />
            )}
          </div>
          <p className="title">{user?.username}</p>
        </section>
      )}
      {size === "normal" && (
        <section className="user-info-header-normal">
          {hasAvatar && (
            <GyAvatar src={avatar} alt={user?.username + "-avatar"} />
          )}
          <Link to={`/profile/${user?.id}`} className="link title">
            {user?.username}
          </Link>
        </section>
      )}
    </div>
  );
};

export default UserHeader;
