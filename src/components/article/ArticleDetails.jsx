import React from "react";
import "./index.scss";
import GyCard from "../../ui/GyCard/GyCard";
import UserHeader from "../user/UserHeader";
import GyTime from "../../ui/GyTime/GyTime";

const ArticleDetails = ({ data }) => {
  return (
    <section className="article-details">
      <GyCard title={data?.title}>
        <section className="article-details-top">
          <UserHeader user={data?.user} size="sm" />
          <GyTime date={data?.createdAt} className="date text-xs" />
        </section>
        <section className="article-details-body">
          <p className="article-desc title">" {data?.description} "</p>
          <img src={data?.img} alt="article cover" className="article-img" />
          <p className="article-content">{data?.content}</p>
        </section>
      </GyCard>
    </section>
  );
};

export default ArticleDetails;
