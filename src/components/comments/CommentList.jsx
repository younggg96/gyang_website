import React, { useContext, useState } from "react";
import "./index.scss";
import GyAvatar from "../../ui/GyAvatar/GyAvatar";
import useAuth from "../../hooks/useAuth";
import GyButton from "../../ui/GyButton/GyButton";
import EditorIcons from "../editor/EditorIcons";
import UserHeader from "../user/UserHeader";
import GyTime from "../../ui/GyTime/GyTime";
import GyInput from "../../ui/GyInput/GyInput";
import { useForm } from "react-hook-form";
import EmptyData from "../error/EmptyData";
import GyPopup from "../../ui/GyPopup";
import EmojiPicker from "emoji-picker-react";
import ActionsBox from "./ActionsBox";
import { useRequest } from "ahooks";
import { getChildrenCommentsByPid } from "../../api/comment";
import { LevelContext } from "../article/ArticleDetails";

const CommentInput = () => {
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
    <>
      <h2 className="title">Your Comments:</h2>
      <div className="comment-input">
        <GyAvatar src={user?.avatar} className="avatar" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <GyInput
            placeholder="Leave your comments..."
            className="mb-2"
            type="text"
            name="comment"
            form={register("comment", {
              required: "Please enter your comments...",
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
                <GyPopup open={open} setOpen={setOpen} className>
                  <EmojiPicker lazyLoadEmojis={true} theme={"auto"} />
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
      <hr />
    </>
  );
};

const CommentItem = ({ data, ...props }) => {
  const { content, createdAt, user, id, _count } = data;
  const [commentBoxOpened, setCommentBoxOpened] = useState(false);
  const [replies, setReplies] = useState({ meta: {}, data: {} });
  const [liked, setLiked] = useState(false);
  const { level, setLevel, setCurComment } = useContext(LevelContext);
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
      setCommentBoxOpened(!commentBoxOpened);
      setReplies(result);
      setLevel(level + 1);
      if (level === 1) {
        setCurComment(result.data);
      }
    },
  });

  const clickCommentHandler = (pid) => {
    run(1, 3, pid);
  };

  return (
    <div className="comments-item" {...props}>
      <section className="user">
        {user && <UserHeader user={user} size="sm" />}
        <GyTime date={createdAt} className="date" />
      </section>
      {level}
      <p className="content">{content}</p>
      <ActionsBox
        actions={actions}
        className="mb-2"
        clickCommentHandler={() => clickCommentHandler(id)}
      />
      {/* comment list */}
      {commentBoxOpened && replies?.data && !loading && (
        <CommentList data={replies?.data} type="comment2" level={level} />
      )}
    </div>
  );
};

const CommentTitle = ({ data }) => {
  return (
    <>
      <h2 className="title">
        Comments {!!data.length && <span>({data.length})</span>}
      </h2>
      {!data.length && (
        <EmptyData
          content={{
            sub: "No Comments Yet...",
          }}
        ></EmptyData>
      )}
    </>
  );
};

const CommentList = ({ data, type }) => {
  const { state } = useAuth();
  const { isAuth } = state;

  return (
    <section className="comments-list mb-4">
      {type === "comment" && (
        <>
          {isAuth && <CommentInput />}
          <CommentTitle data={data} />
          <div className="comments-content">
            {data.map((item) => {
              return <CommentItem data={item} key={item.id} />;
            })}
          </div>
        </>
      )}
      {type === "comment2" && (
        <>
          {isAuth && <CommentInput />}
          <CommentTitle data={data} />
          <div className="comments-content">
            {data.map((item) => {
              return <CommentItem data={item} key={item.id} />;
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default CommentList;
