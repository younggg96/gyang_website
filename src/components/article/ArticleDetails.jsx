import React, { createContext, useEffect, useState } from "react";
import "./index.scss";
import GyCard from "../../ui/GyCard/GyCard";
import UserHeader from "../user/UserHeader";
import GyTime from "../../ui/GyTime/GyTime";
import CommentList from "../comments/CommentList";

export const LevelContext = createContext();

const ArticleDetails = ({ data }) => {
  const { title, user, createdAt, description, img, content, comments } = data;
  const [curComment, setCurComment] = useState();
  const [level, setLevel] = useState(0);

  return (
    <section className="article-details">
      <GyCard title={title}>
        <section className="article-details-top">
          <UserHeader user={user} size="sm" />
          <GyTime date={createdAt} className="date text-xs" />
        </section>
        <section className="article-details-body">
          <p className="article-desc title">" {description} "</p>
          <img src={img} alt="article cover" className="article-img" />
          <p className="article-content">{content}</p>
        </section>
      </GyCard>
      <section className="article-comments">
        <GyCard>
          {level}
          <LevelContext.Provider value={{ level, setLevel, setCurComment }}>
            {level <= 1 ? (
              <CommentList data={comments} type="comment2" />
            ) : (
              <CommentList data={curComment} type="comment2" />
            )}
            <div onClick={() => setLevel(0)}>back</div>
          </LevelContext.Provider>
        </GyCard>
      </section>
    </section>
  );
};

export default ArticleDetails;
