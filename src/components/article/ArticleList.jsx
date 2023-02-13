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
import Categories from "./Categories";

const ArticleItem = (props) => {
  const { title, img, description, createdAt, categories, id } = props.data;
  return (
    <li className="article-item">
      <img src={img} alt={title + "header-img"} className="left" />
      <div className="right">
        <h2 className="title">
          <Link to={`/article/${id}`}>{title}</Link>
        </h2>
        <div className="user">
          {props.data.user && <UserHeader user={props.data.user} size="sm" />}
          <GyTime date={createdAt} className="date" />
        </div>
        <p className="content">{description}</p>
        <Categories categories={categories} />
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
      <div className="list">
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
