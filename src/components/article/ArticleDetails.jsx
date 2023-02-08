import React, { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { getArticleDetails } from "../../api/index";
import "./index.scss";
import GyLoader from "../../ui/GyLoader/GyLoader";

const ArticleDetails = ({ userId = null }) => {
  const { error, loading, run } = useRequest(getArticleDetails, {
    manual: true,
    onSuccess: (result, params) => {},
  });
  useEffect(() => {}, []);

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <section className="article-list">
      <div className="list">{loading && <GyLoader />}</div>
    </section>
  );
};

export default ArticleDetails;
