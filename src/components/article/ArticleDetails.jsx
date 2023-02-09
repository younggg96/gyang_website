import React, { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { getArticleByArticleId } from "../../api/index";
import "./index.scss";
import GyLoader from "../../ui/GyLoader/GyLoader";
import GyCard from "../../ui/GyCard/GyCard";
import UserHeader from "../user/UserHeader";
import GyTime from "../../ui/GyTime/GyTime";

const ArticleDetails = ({ articleId }) => {
  const [articleDetail, setArticleDetail] = useState();
  const { error, loading, run } = useRequest(getArticleByArticleId, {
    manual: true,
    onSuccess: (result, params) => {
      setArticleDetail(result?.data);
    },
  });
  useEffect(() => {
    run(articleId);
  }, [articleId, run]);

  if (error) {
    return <div>failed to load</div>;
  }
  return (
    <section className="article-details">
      {/* {JSON.stringify(loading)} */}
      <GyCard title={articleDetail?.title}>
        <div>{loading && <GyLoader />}</div>
        <section className="flex items-center gap-8 mt-2 mb-8">
          <UserHeader user={articleDetail?.user} type="small"/>
          <GyTime date={articleDetail?.createdAt} className="date text-xs" />
        </section>
        <section className="article">
          <p>
          {articleDetail?.content}
          </p>
        </section>
        {/* {JSON.stringify(articleDetail)} */}
      </GyCard>
    </section>
  );
};

export default ArticleDetails;
