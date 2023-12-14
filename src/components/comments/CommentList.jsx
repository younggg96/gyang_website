import React, { useState, useContext, useRef, createContext } from "react";
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
import AddEmojiBtn from "../editor/AddEmojiBtn";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
// ui
import GyAvatar from "../../ui/GyAvatar/GyAvatar";
import GyButton from "../../ui/GyButton/GyButton";
import GyTime from "../../ui/GyTime/GyTime";
import GyLoader from "../../ui/GyLoader/GyLoader";
import GyTextarea from "../../ui/GyTextarea/GyTextarea";
// scss
import "./index.scss";
// api
import { createComment, createReply } from "../../api/comment";
import { ArticleContext } from "../../components/article/ArticleDetails";
import { useNavigate } from "react-router-dom";
// default avatar img
import defaultAvatar from "../../assets/imgs/avatar/default-avatar.jpg";

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

const CommentItemContext = createContext({
  refreshData: () => {},
});

export const CommentInput = ({
  type,
  replyObj,
  hideReplyBtn,
  setData,
  ...props
}) => {
  const { state } = useAuth();
  const { user } = state;
  const { articleId, setArticleDetail, refreshTopComments } =
    useContext(ArticleContext);
  const { addToast } = useToast();
  const { refreshData } = useContext(CommentItemContext);
  const createData = type === "comments" ? createComment : createReply;
  const { error, loading, run } = useRequest(createData, {
    manual: true,
    onSuccess: (result) => {
      hideReplyBtn && hideReplyBtn();
      setArticleDetail(result?.data);
      refreshTopComments();
      type !== "comments" && refreshData(replyObj.parentId);
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
      replyTo: replyObj.replyTo || "",
    };
    run(obj);
    reset();
  };

  const emojiClickHandler = (e) => {
    console.log(e);
  };

  const avatar = user?.avatar || defaultAvatar;

  return (
    <section className="comment-editor" {...props}>
      <div className="comment-input">
        <GyAvatar src={avatar} className="avatar" />
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
                x="right"
                y="bottom"
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

export const CommentItem = ({ data, setData, type, ...props }) => {
  const {
    content,
    createdAt,
    user,
    id,
    parentId,
    curUserLiked,
    _count,
  } = data;
  // hooks
  const { articleId } = useContext(ArticleContext);
  const navigate = useNavigate();
  const { state } = useAuth();
  const { addToast } = useToast();
  const actionRef = useRef(null);
  // states
  const [commentBoxOpened, setCommentBoxOpened] = useState(false);
  const [replies, setReplies] = useState();
  const [liked, setLiked] = useState(curUserLiked);
  const [openInput, setOpenInput] = useState(false);
  const [page, setPage] = useState(1);
  const [row, setRow] = useState(3);

  const actions = {
    id,
    comment: {
      commentBoxOpened,
      commentCount: _count.replies,
    },
    like: { liked, setLiked, count: _count.commentLikes },
  };

  const { error, loading, run } = useRequest(getChildrenCommentsByPid, {
    manual: true,
    onSuccess: (result, params) => {
      setReplies(result);
    },
  });

  const clickCommentBtn = () => {
    if (commentBoxOpened) {
      // close comment list back to page 1
      setPage(1);
      setRow(3);
      setCommentBoxOpened(!commentBoxOpened);
    } else {
      if (state.isAuth) {
        setCommentBoxOpened(!commentBoxOpened);
        run(page, row, id);
      } else {
        addToast({
          content: "Please sign in to view more details.",
          time: TIME.SHORT,
          type: TYPE.INFO,
        });
        navigate("/auth");
      }
    }
  };

  const clickReplyBtn = () => {
    setOpenInput(!openInput);
  };

  const hideReplyBtn = () => {
    setOpenInput(false);
    actionRef.current.setShow(false);
  };

  const clickBtnHandler = (btnType) => {
    switch (btnType) {
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

  const showMore = () => {
    setPage(page + 1);
    setRow(5);
    run(page + 1, 5, id);
  };

  const refreshData = (pid) => {
    run(page, row, pid);
  };

  let actionType;
  if (type === "comments") {
    actionType = "reply";
  } else if (type === "reply") {
    actionType = "subReply";
  }

  const replyObj = {
    articleId,
    parentId: parentId ? parentId : id,
    replyTo: parentId ? id : null,
  };

  return (
    <div className="comments-item" {...props}>
      <section className="user">
        <UserHeader user={user} size="xs" className="mr-auto" />
        <GyTime date={createdAt} className="date" />
      </section>
      <p className="content">{content}</p>
      <ActionsBox
        type={actionType}
        actions={actions}
        clickBtnHandler={(type) => clickBtnHandler(type)}
        ref={actionRef}
      />
      {/* comment input */}
      <CommentItemContext.Provider value={{ refreshData }}>
        {openInput && (
          <CommentInput
            type="reply"
            replyObj={replyObj}
            hideReplyBtn={hideReplyBtn}
          />
        )}
        {/* comment list */}
        {commentBoxOpened && (
          <>
            {replies && !loading && (
              <CommentList
                data={replies?.data}
                count={replies?.meta.total}
                type="subReply"
              />
            )}
            {loading && <GyLoader />}
            {replies?.hasMore && !loading && (
              <GyButton
                size={["sm", "round"]}
                className="show-more-btn"
                click={() => showMore()}
              >
                Show more replies
              </GyButton>
            )}
          </>
        )}
      </CommentItemContext.Provider>
    </div>
  );
};

export const CommentSubItem = ({ data, setData, type, ...props }) => {
  const {
    content,
    createdAt,
    user,
    id,
    parentId,
    curUserLiked,
    replyToComment,
    _count,
  } = data;
  const { articleId } = useContext(ArticleContext);
  const [liked, setLiked] = useState(curUserLiked);
  const [openInput, setOpenInput] = useState(false);
  const actionRef = useRef(null);

  const actions = {
    id,
    comment: null,
    like: { liked, setLiked, count: _count.commentLikes },
  };

  const clickReplyBtn = () => {
    setOpenInput(!openInput);
  };

  const hideReplyBtn = () => {
    setOpenInput(false);
    actionRef.current.setShow(false);
  };

  const replyObj = {
    articleId,
    parentId: parentId ? parentId : id,
    replyTo: parentId ? id : null,
  };

  return (
    <div className="comments-item" {...props}>
      <section className="user">
        <div className="user-wapper">
          {user && <UserHeader user={user} size="xs" />}
          {replyToComment && (
            <>
              <span className="reply-label">Replied</span>
            </>
          )}
        </div>
        <GyTime date={createdAt} className="date" />
      </section>
      {replyToComment && (
        <div className="reply-content">
          <div className="reply-content-user">
            <div className="line"></div>
            <UserHeader user={replyToComment.user} size="xs" />:
          </div>
          <p className="reply-content-details">{replyToComment.content}</p>
        </div>
      )}
      <p className="content">{content}</p>
      <ActionsBox
        type={type}
        actions={actions}
        clickBtnHandler={() => clickReplyBtn()}
        ref={actionRef}
      />
      {/* comment input */}
      {openInput && (
        <CommentInput
          type={type}
          replyObj={replyObj}
          hideReplyBtn={hideReplyBtn}
        />
      )}
    </div>
  );
};

const CommentList = ({ data, setData, count, type }) => {
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
          return type === "comments" ? (
            <CommentItem
              data={item}
              setData={setData}
              key={item.id}
              type={type}
            />
          ) : (
            <CommentSubItem
              data={item}
              setData={setData}
              key={item.id}
              type={type}
            />
          );
        })}
      </div>
    </section>
  );
};

export default CommentList;
