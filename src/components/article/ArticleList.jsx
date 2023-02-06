import React, { useState } from "react";
import { useRequest } from "ahooks";
import { Link } from "react-router-dom";
import GyTime from "../../ui/GyTime/GyTime";

import "./index.scss";
import UserHeader from "../user/UserHeader";
import GyPagination from "../../ui/GyPagination/GyPagination";
import { useEffect } from "react";
import { getArticleList, getArticleListByUserId } from "../../api";
import GyLoader from "../../ui/GyLoader/GyLoader";

const CategoriesSection = ({ categories }) => {
  return (
    <section className="article-categories flex items-center gap-4">
      {categories?.map((cate) => {
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
  const { title, img, content, createdAt, categories } = props.data;
  return (
    <li className="article-item article-item flex gap-2 lg:gap-4 p-4 flex-col lg:flex-row">
      <img
        src={img}
        alt={title + "header-img"}
        className="left w-full lg:w-[300px] md:h-fit lg:mt-4 lg:ml-4 object-contain"
      />
      <div className="right flex flex-col gap-2 lg:gap-4 px-2">
        <h2 className="article-title title">{title}</h2>
        {props.data.user && <UserHeader user={props.data.user} />}
        <p className="article-content mb-4">{content}</p>
        <CategoriesSection categories={categories} />
        <p className="article-date">
          <GyTime date={createdAt} />
        </p>
      </div>
    </li>
  );
};

const ArticleList = ({ userId = null }) => {
  const [curPage, setCurPage] = useState(1);
  const [articleList, setArticleList] = useState([]);
  const [pagination, setPagination] = useState();

  const getData = !userId ? getArticleList : getArticleListByUserId;

  const { error, loading, run } = useRequest(getData, {
    manual: true,
    onSuccess: (result, params) => {
      setArticleList(result?.data);
      setPagination(result?.meta);
    },
  });
  useEffect(() => {
    run(curPage, userId);
  }, [curPage, userId]);

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <section className="article-list">
      <div className="list flex flex-col mt-4 mb-4 bg-white shadow-lg rounded-2xl">
        {loading && <GyLoader />}
        <ul>
          {articleList.map((item) => {
            return <ArticleItem key={item.id} data={item} />;
          })}
        </ul>
        <GyPagination
          row={pagination?.row}
          curPage={pagination?.current_page}
          pageRow={pagination?.page_row}
          onCurPageChange={(page) => {
            setCurPage(page);
          }}
        />
      </div>
    </section>
  );
};

export default ArticleList;
