import React from "react";
import { Link } from "react-router-dom";

const UserHeader = ({ user, type = "small" }) => {
  if (type === "small")
    return (
      <section className="user-info-small">
        <div className="user-content">
          <img src={user?.avatar} alt={user?.username + "-avatar"} />
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
    );
  if (type === "big")
    return (
      <section className="user-info-big">
        <div className="user-avatar">
          <img src={user?.avatar} alt={user?.username + "-avatar"} />
        </div>
        <p className="title text-primary mt-8 mb-6 md:m-auto ml-0 md:ml-60 w-full md:w-fit text-center md:text-left">
          {user?.username}
        </p>
      </section>
    );
};

export default UserHeader;
