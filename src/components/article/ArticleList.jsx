import React from "react";
import { get } from "../../api/axios";
import { useRequest } from "ahooks";
import { Link } from "react-router-dom";
import GyTime from "../../ui/GyTime/GyTime";

import "./index.scss";
import UserHeader from "../user/UserHeader";
import GyPagination from "../../ui/GyPagination/GyPagination";

const CategoriesSection = ({ categories }) => {
  return (
    <section className="article-categories flex items-center gap-4">
      {categories.map((cate) => {
        return (
          <Link
            className="bg-slate-100 border rounded-3xl py-2 px-4 text-sm"
            key={cate.id}
          >
            {cate.title}
          </Link>
        );
      })}
    </section>
  );
};

const ArticleItem = (props) => {
  const { title, img, content, createdAt, user, categories } = props.user;
  return (
    <li className="article-item article-item flex gap-2 lg:gap-8 p-4 flex-col lg:flex-row">
      <img
        src={img}
        alt={title + "header-img"}
        className="left w-full lg:w-[300px] md:h-fit md:self-center object-contain"
      />
      <div className="right flex flex-col gap-2 lg:gap-4 px-4">
        <h2 className="article-title title">{title}</h2>
        <UserHeader user={user} />
        <p className="article-content mb-4">{content}</p>
        <CategoriesSection categories={categories} />
        <p className="article-date">
          <GyTime date={createdAt} />
        </p>
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
    <section className="article-list">
      <section className="list flex flex-col my-4 bg-white shadow-lg rounded-2xl">
        <ul>
          {articleList.map((item, index) => {
            return <ArticleItem key={item.id} user={item} />;
          })}
        </ul>
        <GyPagination row={10} currentPage={2} total={30} pageRow={11}/>
      </section>
    </section>
  );
};

export default ArticleList;
