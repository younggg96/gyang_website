import React, { createContext, useState } from "react";
// components
import UserHeader from "../user/UserHeader";
import { ActionsFlowBox } from "../comments/ActionsBox";
import CommentList, { CommentInput } from "../comments/CommentList";
// ui
import GyTime from "../../ui/GyTime/GyTime";
import GyCard from "../../ui/GyCard/GyCard";
// scss
import "./index.scss";
import "../comments/index.scss";
import { useContext } from "react";
import { ArticleContext } from "../../pages/ArticlePage";
import GyButton from "../../ui/GyButton/GyButton";

const ArticleDetails = ({ data }) => {
  const {
    title,
    user,
    createdAt,
    description,
    img,
    content,
    comments,
    commentCount,
    curUserLiked,
    articleLikeCount,
    id,
  } = data;

  const { isAuth } = useContext(ArticleContext);

  const actions = {
    id,
    comment: {
      commentCount,
    },
    like: { curUserLiked, count: articleLikeCount },
  };

  const clickCommentBtn = () => {};

  const clickReplyBtn = () => {};

  const clickBtnHandler = (type) => {
    switch (type) {
      case "commentBtn":
        clickCommentBtn();
        break;
      case "replyBtn":
        clickReplyBtn();
        break;
      default:
        break;
    }
  };

  const replyObj = {
    parentId: null,
    replyTo: null,
  };

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
          <ActionsFlowBox
            actions={actions}
            clickBtnHandler={(type) => clickBtnHandler(type)}
          />
        </section>
      </GyCard>
      <section className="article-comments">
        <GyCard>
          {isAuth && <CommentInput type="comments" replyObj={replyObj} />}
          <CommentList data={comments} count={commentCount} type="comments" />
          <GyButton size={["sm", "round"]} className="show-more-btn">
            Show more comments
          </GyButton>
        </GyCard>
      </section>
    </section>
  );
};

export default ArticleDetails;
