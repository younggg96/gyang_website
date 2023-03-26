import React, { useState } from "react";
import { useRequest } from "ahooks";
import { useForm } from "react-hook-form";
// apis
import { getChildrenCommentsByPid } from "../../api/comment";
// hooks
import useAuth from "../../hooks/useAuth";
// components
import ActionsBox from "./ActionsBox";
import EmptyData from "../error/EmptyData";
import UserHeader from "../user/UserHeader";
// ui
import GyAvatar from "../../ui/GyAvatar/GyAvatar";
import GyButton from "../../ui/GyButton/GyButton";
import GyTime from "../../ui/GyTime/GyTime";
import GyLoader from "../../ui/GyLoader/GyLoader";
// scss
import "./index.scss";
import AddEmojiBtn from "../editor/AddEmojiBtn";
import GyTextarea from "../../ui/GyTextarea/GyTextarea";
import { createComment, createReply } from "../../api/comment";
import { useContext } from "react";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
import { ArticleContext } from "../../pages/ArticlePage";

const InputPropsComment = {
  title: "Comment",
  num: "Comments",
  empty: "No Comments Yet...",
  placeholder: "Write your comment...",
  required: "Please enter your comment...",
  success: "Comment submitted successed!",
};

const InputPropsReply = {
  title: "Reply",
  num: "Replies",
  empty: "No Replies Yet...",
  placeholder: "Write your reply...",
  required: "Please enter your reply...",
  success: "Relay successed!",
};

export const CommentInput = ({ type, replyObj, ...props }) => {
  const { state } = useAuth();
  const { user } = state;
  const { articleId, setArticleDetail } = useContext(ArticleContext);
  const { addToast } = useToast();

  const createData = type === "comments" ? createComment : createReply;
  const { error, loading, run } = useRequest(createData, {
    manual: true,
    onSuccess: (result) => {
      setArticleDetail(result.data);
      addToast({
        content:
          type === "comments"
            ? InputPropsComment.success
            : InputPropsReply.success,
        time: TIME.SHORT,
        type: TYPE.SUCCESS,
      });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const obj = {
      content: data.comment,
      articleId: articleId,
      parentId: replyObj.parentId,
      replyTo: replyObj.replyTo,
    };
    run(obj);
    reset();
  };

  const emojiClickHandler = (e) => {
    console.log(e);
  };

  return (
    <section className="comment-editor" {...props}>
      <div className="comment-input">
        <GyAvatar src={user?.avatar} className="avatar" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <GyTextarea
            placeholder={
              type === "comments"
                ? InputPropsComment.placeholder
                : InputPropsReply.placeholder
            }
            required={false}
            type="text"
            form={register("comment", {
              required:
                type === "comments"
                  ? InputPropsComment.required
                  : InputPropsReply.required,
            })}
            hideLabel={
              type === "comments"
                ? InputPropsComment.title
                : InputPropsReply.title
            }
          />
          {errors.comment && (
            <p className="error-msg">{errors.comment.message}</p>
          )}
          <div className="btns">
            <div className="icon-btns">
              <AddEmojiBtn
                emojiClickHandler={emojiClickHandler}
                emojiPopupPosition="right"
              />
            </div>
            <GyButton
              size={["sm"]}
              className="post-btn"
              type="submit"
              loading={loading}
            >
              Submit
            </GyButton>
          </div>
        </form>
      </div>
    </section>
  );
};

export const CommentItem = ({ data, type, ...props }) => {
  const { content, createdAt, user, id, replyToComment, _count } = data;
  const { articleId } = useContext(ArticleContext);
  const [commentBoxOpened, setCommentBoxOpened] = useState(false);
  const [replies, setReplies] = useState();
  const [liked, setLiked] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const actions = {
    id,
    comment: {
      commentBoxOpened,
      commentCount: _count.replies,
    },
    like: { liked, setLiked, count: 3 },
  };

  const { error, loading, run } = useRequest(getChildrenCommentsByPid, {
    manual: true,
    onSuccess: (result, params) => {
      setReplies(result);
    },
  });

  const clickCommentBtn = () => {
    setCommentBoxOpened(!commentBoxOpened);
    run(1, 3, id);
  };

  const clickReplyBtn = () => {
    setOpenInput(!openInput);
  };

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
    articleId,
    parentId: data.replyTo === 0 ? data.parentId : data.id,
    replyTo: data.replyTo === 0 ? data.id : data.replyTo,
  };

  return (
    <div className="comments-item" {...props}>
      <section className="user">
        <div className="flex items-center">
          {user && <UserHeader user={user} size="sm" />}
          {replyToComment && (
            <>
              <span className="mx-4 px-[8px] dark:text-text text-textDark rounded-md dark:bg-background bg-backgroundDark">
                Replied
              </span>
              <UserHeader user={replyToComment.user} size="sm" />
            </>
          )}
        </div>
        <GyTime date={createdAt} className="date" />
      </section>
      <p className="content">{content}</p>
      <ActionsBox
        type={type}
        actions={actions}
        clickBtnHandler={(type) => clickBtnHandler(type)}
      />
      {/* comment input */}
      {openInput && <CommentInput type="reply" replyObj={replyObj} />}
      {/* comment list */}
      {commentBoxOpened && (
        <>
          {loading && <GyLoader />}
          {!loading && (
            <CommentList
              data={replies.data}
              count={replies?.meta.total}
              type="reply"
            />
          )}
        </>
      )}
    </div>
  );
};

const CommentList = ({ data, count, type }) => {
  const CommentTitle = () => {
    return (
      <>
        <h2 className="title">
          {type === "comments" ? InputPropsComment.num : InputPropsReply.num}{" "}
          {!!count && <span>({count})</span>}
        </h2>
        {!count && (
          <EmptyData
            content={{
              sub:
                type === "comments"
                  ? InputPropsComment.empty
                  : InputPropsReply.empty,
            }}
          ></EmptyData>
        )}
      </>
    );
  };

  return (
    <section className="comments-list">
      <CommentTitle />
      <div className="comments-content">
        {data.map((item) => {
          return <CommentItem data={item} key={item.id} type={type} />;
        })}
        <GyButton size={["sm", "round"]} className="show-more-btn">
          Show more {type === "comments" ? "comments" : "replies"}
        </GyButton>
      </div>
    </section>
  );
};

export default CommentList;
