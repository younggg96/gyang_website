import React, { useState } from "react";
import { useRequest } from "ahooks";
import { useForm } from "react-hook-form";
import EmojiPicker from "emoji-picker-react";
// apis
import { getChildrenCommentsByPid } from "../../api/comment";
// hooks
import useAuth from "../../hooks/useAuth";
import { getTheme } from "../../helper/theme";
// components
import ActionsBox from "./ActionsBox";
import EmptyData from "../error/EmptyData";
import EditorIcons from "../editor/EditorIcons";
import UserHeader from "../user/UserHeader";
// ui
import GyPopup from "../../ui/GyPopup";
import GyAvatar from "../../ui/GyAvatar/GyAvatar";
import GyButton from "../../ui/GyButton/GyButton";
import GyTime from "../../ui/GyTime/GyTime";
import GyInput from "../../ui/GyInput/GyInput";
import GyCard from "../../ui/GyCard/GyCard";
import GyLoader from "../../ui/GyLoader/GyLoader";
// scss
import "./index.scss";

const InputPropsComment = {
  title: "Comment",
  num: "Comments",
  empty: "No Comments Yet...",
  placeholder: "Leave your comment...",
  required: "Please enter your comment...",
};

const InputPropsReply = {
  title: "Reply",
  num: "Replies",
  empty: "No Replies Yet...",
  placeholder: "Leave your reply...",
  required: "Please enter your reply...",
};

export const CommentInput = ({ type }) => {
  const { state } = useAuth();
  const { user } = state;
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="comment-editor">
      <h2 className="title">
        Your{" "}
        {type === "comments" ? InputPropsComment.title : InputPropsReply.title}:
      </h2>
      <div className="comment-input">
        <GyAvatar src={user?.avatar} className="avatar" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <GyInput
            placeholder={
              type === "comments"
                ? InputPropsComment.placeholder
                : InputPropsReply.placeholder
            }
            className="mb-2"
            type="text"
            name="comment"
            form={register("comment", {
              required:
                type === "comments"
                  ? InputPropsComment.required
                  : InputPropsReply.required,
            })}
          />
          {errors.comment && (
            <p className="error-msg">{errors.comment.message}</p>
          )}
          <div className="btns">
            <div className="icon-btns">
              <div>
                <GyButton size={["sm", "round"]} click={() => setOpen(!open)}>
                  <EditorIcons.EmojiIcon />
                  <span className="sr-only">Add Emoji</span>
                </GyButton>
                <GyPopup open={open} setOpen={setOpen}>
                  <EmojiPicker lazyLoadEmojis={true} theme={getTheme()} />
                </GyPopup>
              </div>
              <GyButton size={["sm", "round"]}>
                <EditorIcons.UploadImgIcon />
                <span className="sr-only">Upload image</span>
              </GyButton>
            </div>
            <GyButton
              size={["sm"]}
              click={() => console.log()}
              className="post-btn"
              type="submit"
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
  const {
    content,
    createdAt,
    user,
    id,
    replyToComment,
    _count,
  } = data;
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
      {openInput && (
        <GyCard>
          <CommentInput type={type} />
        </GyCard>
      )}
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
        <GyButton size={["sm", "round"]} className="mr-auto">
          Show more {type === "comments" ? "comments" : "replies"}
        </GyButton>
      </div>
    </section>
  );
};

export default CommentList;
