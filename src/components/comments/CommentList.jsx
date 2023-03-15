import React, { useState } from "react";
import "./index.scss";
import GyAvatar from "../../ui/GyAvatar/GyAvatar";
import useAuth from "../../hooks/useAuth";
import GyButton from "../../ui/GyButton/GyButton";
import EditorIcons from "../editor/EditorIcons";
import UserHeader from "../user/UserHeader";
import GyTime from "../../ui/GyTime/GyTime";
import GyInput from "../../ui/GyInput/GyInput";
import { useForm } from "react-hook-form";
import Error from "../error/Error";
import EmptyData from "../error/EmptyData";
import GyPopup from "../../ui/GyPopup";
import EmojiPicker from "emoji-picker-react";
import ActionsBox from "./ActionsBox";

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
  const { content, createdAt, user, id, reply } = data;
  const [commentBoxOpened, setCommentBoxOpened] = useState(false);
  const [liked, setLiked] = useState(false);
  const actions = {
    id,
    comment: {
      commentBoxOpened,
      setCommentBoxOpened,
      commentData: reply,
    },
    like: { liked, setLiked, likeData: [1, 2, 3] },
  };
  return (
    <div className="comments-item" {...props}>
      <section className="user">
        {user && <UserHeader user={user} size="sm" />}
        <GyTime date={createdAt} className="date text-xs" />
      </section>
      <p className="content">{content}</p>
      <ActionsBox actions={actions} className="mb-2" />
      {/* comment list */}
      {commentBoxOpened && <CommentList data={reply} type="reply" />}
    </div>
  );
};

const ReplyItem = ({ data, ...props }) => {
  const { content, createdAt, user, id } = data;
  // const [commentBoxOpened, setCommentBoxOpened] = useState(false);
  // const [liked, setLiked] = useState(false);
  // const actions = {
  //   id,
  //   comment: {
  //     commentBoxOpened,
  //     setCommentBoxOpened,
  //     commentData: reply,
  //   },
  //   like: { liked, setLiked, likeData: [1, 2, 3] },
  // };
  return (
    <div className="comments-item" {...props}>
      <section className="user">
        {user && <UserHeader user={user} size="sm" />}
        <GyTime date={createdAt} className="date text-xs" />
      </section>
      <p className="content">{content}</p>
      {/* <ActionsBox actions={actions} className="mb-2" /> */}
      {/* comment list */}
      {/* {JSON.stringify(reply)}
      {commentBoxOpened && <CommentList data={reply} type="reply" />} */}
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
      {type === "reply" && (
        <>
          <div className="comments-content">
            {data.map((item) => {
              return <ReplyItem data={item} key={item.id} />;
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default CommentList;
