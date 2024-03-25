import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import "./index.scss";
import Categories from "./Categories";
import UserHeader from "../user/UserHeader";
import GyTime from "../../ui/GyTime/GyTime";
import GyLoader from "../../ui/GyLoader/GyLoader";
import useWindowsSize from "../../hooks/useWindowsSize";
import EmptyData from "../error/EmptyData";

const ArticleItem = ({ data }) => {
  const { title, img, description, createdAt, categories, id } = data;
  const window = useWindowsSize();
  const mobileMode = window === "md" || window === "sm";

  const UserSection = () => (
    <div className="article-item__user">
      {data.user && (
        <UserHeader user={data.user} size={mobileMode ? "xs" : "sm"} />
      )}
      <GyTime date={createdAt} className="date" />
    </div>
  );

  const TitleSection = () => (
    <h2 className="article-item__title">
      <Link to={`/article/${id}`}>{title}</Link>
    </h2>
  );

  const ContentSection = () => (
    <div className="article-item__content">
      <DescriptionSection />
    </div>
  );

  const ContentSectionMobile = () => (
    <div className="article-item__content">
      <DescriptionSection />
      <ImgSection />
    </div>
  );

  const DescriptionSection = () => (
    <p className="article-item__description text-line-3">{description}</p>
  );

  const ImgSection = () => (
    <img
      className="article-item__content-img"
      src={img}
      alt={title + " header-img"}
    />
  );

  return (
    <li
      className={classNames([
        "article-item",
        {
          desktop: !mobileMode,
          mobile: mobileMode,
        },
      ])}
    >
      {mobileMode ? (
        <>
          <TitleSection />
          <UserSection />
          <ContentSectionMobile />
          <Categories categories={categories} />
        </>
      ) : (
        <>
          <div className="left">
            <ImgSection />
          </div>
          <div className="right">
            <TitleSection />
            <UserSection />
            <ContentSection />
            <Categories categories={categories} />
          </div>
        </>
      )}
    </li>
  );
};

const ArticleList = ({ getArticleListRequest, articleList }) => {
  const { error, loading } = getArticleListRequest;

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <section className="article-list">
      <div className="list">
        {loading ? (
          <GyLoader />
        ) : (
          <>
            <ul>
              {articleList.map((item) => {
                return <ArticleItem key={item.id} data={item} />;
              })}
            </ul>
            {!!!articleList.length && (
              <EmptyData content={{ sub: "No data..." }}></EmptyData>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ArticleList;
