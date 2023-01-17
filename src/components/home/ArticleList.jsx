import React from "react";
import { get } from "../../api/axios";
import { useRequest } from "ahooks";
import { Link } from "react-router-dom";

import "./index.scss";

const UserInfo = ({ user }) => {
  return (
    <section className="user-info flex items-center gap-4">
      {/* {JSON.stringify(user)} */}
      <img
        className="rounded-full w-16"
        src={user?.avatar}
        alt={user?.username + "avatar"}
      />
      <Link to={"/"} className="text-lg text-primary link">
        {user?.username}
      </Link>
    </section>
  );
};

const ArticleItem = (props) => {
  const { title, img, content, createdAt, user, categories } = props.user;
  return (
    <li className="article-item article-item flex gap-8 p-4 flex-col md:flex-row">
      <img src={img} alt={title + "header-img"} className="left w-full md:w-[300px] md:h-fit md:self-center object-contain" />
      <div className="right flex flex-col gap-4">
        <h2 className="title">{title}</h2>
        <UserInfo user={user} />
        <p className="mb-4">{content}</p>
        <p>{createdAt}</p>
      </div>
    </li>
  );
};

const ArticleList = ({ page }) => {
  const getArticleList = () => get("/article/?page=" + page);
  const { data, error, loading } = useRequest(getArticleList);
  const articleList = data?.data;
  if (error) {
    return <div>failed to load</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <ul className="article-list flex flex-col my-4 bg-white shadow-lg rounded-2xl">
      {articleList.map((item, index) => {
        return <ArticleItem key={item.id} user={item} />;
      })}
    </ul>
  );
};

export default ArticleList;
