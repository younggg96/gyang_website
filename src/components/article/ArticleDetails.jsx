import React, { createContext, useState } from "react";
import "./index.scss";
import "../comments/index.scss";
import GyCard from "../../ui/GyCard/GyCard";
import UserHeader from "../user/UserHeader";
import GyTime from "../../ui/GyTime/GyTime";
import CommentList, { CommentInput } from "../comments/CommentList";
import { useRequest } from "ahooks";
import { getChildrenCommentsByPid } from "../../api/comment";
import useAuth from "../../hooks/useAuth";
import { ActionsFlowBox } from "../comments/ActionsBox";

export const LevelContext = createContext();

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
    id,
  } = data;
  const { state } = useAuth();
  const { isAuth } = state;

  const [liked, setLiked] = useState(false);
  const actions = {
    id,
    comment: {
      commentCount,
    },
    like: { liked, setLiked, count: 3 },
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
          {isAuth && <CommentInput type="comments" />}
          <CommentList data={comments} count={commentCount} type="comments" />
        </GyCard>
      </section>
    </section>
  );
};

export default ArticleDetails;
