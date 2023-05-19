import React, { createContext, useContext, useRef, useState } from "react";
// hooks
import { useRequest } from "ahooks";
// components
import UserHeader from "../user/UserHeader";
import { ActionsFlowBox } from "../comments/ActionsBox";
import CommentList, { CommentInput } from "../comments/CommentList";
// ui
import GyTime from "../../ui/GyTime/GyTime";
import GyCard from "../../ui/GyCard/GyCard";
import GyButton from "../../ui/GyButton/GyButton";
// scss
import "./index.scss";
import "../comments/index.scss";
// apis
import { getCommentsByArticleId } from "../../api/comment";
import GyLoader from "../../ui/GyLoader/GyLoader";

// Article Context
export const ArticleContext = createContext();

const ArticleDetails = ({
  articleDetail,
  setArticleDetail,
  articleId,
  isAuth,
}) => {
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
  } = articleDetail;

  const [commentList, setCommentList] = useState(comments);
  const [hasMoreBtn, setHasMoreBtn] = useState(commentCount > 5);
  const [page, setPage] = useState(1);
  const [row, setRow] = useState(5);
  const targetRef = useRef(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { error, loading, run } = useRequest(getCommentsByArticleId, {
    manual: true,
    onSuccess: (result) => {
      setCommentList(result?.data);
      setHasMoreBtn(result?.hasMore);
    },
  });

  const actions = {
    id,
    comment: {
      commentCount,
    },
    like: { curUserLiked, count: articleLikeCount },
  };

  const clickCommentBtn = () => {
    scrollToTarget()
  };

  const refreshTopComments = () => {
    run(page, row, articleId);
  };

  const showMoreComments = () => {
    run(page + 1, row, articleId);
    setPage(page + 1);
  };

  const clickFlowBtnHandler = (type) => {
    switch (type) {
      case "commentBtn":
        clickCommentBtn();
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
          <p
            className="article-content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></p>
          <ActionsFlowBox
            actions={actions}
            clickBtnHandler={(type) => clickFlowBtnHandler(type)}
          />
        </section>
      </GyCard>
      <section className="article-comments" ref={targetRef}>
        <GyCard>
          <ArticleContext.Provider
            value={{ setArticleDetail, articleId, isAuth, refreshTopComments }}
          >
            {isAuth && (
              <CommentInput
                type="comments"
                replyObj={replyObj}
                setData={setCommentList}
              />
            )}
            {loading && <GyLoader />}
            <CommentList
              data={commentList}
              count={commentCount}
              setData={setCommentList}
              type="comments"
            />
            {hasMoreBtn && (
              <GyButton
                size={["sm", "round"]}
                className="show-more-btn"
                click={() => showMoreComments()}
              >
                Show more comments
              </GyButton>
            )}
          </ArticleContext.Provider>
        </GyCard>
      </section>
    </section>
  );
};

export default ArticleDetails;
