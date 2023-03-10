import React, { useContext, useState } from "react";
import "./index.scss";
import GyAvatar from "../../ui/GyAvatar/GyAvatar";
import useAuth from "../../hooks/useAuth";
import GyTextarea from "../../ui/GyTextarea/GyTextarea";
import GyButton from "../../ui/GyButton/GyButton";
import EditorIcons from "../editor/EditorIcons";
import { commentContext } from "../moments/MomentList";
import UserHeader from "../user/UserHeader";
import GyTime from "../../ui/GyTime/GyTime";
import ActionsBox from "./ActionsBox";

const CommentInput = () => {
  const { state } = useAuth();
  const { user } = state;
  return (
    <form className="comment-input">
      <GyAvatar src={user?.avatar} className="avatar left" />
      <div className="right">
        <GyTextarea placeholder="Leave your comments..." rows="3" />
        <div className="btns">
          <div className="icon-btns">
            <GyButton size={["sm", "round"]}>
              <EditorIcons.EmojiIcon />
              <span className="sr-only">Attach file</span>
            </GyButton>
            <GyButton size={["sm", "round"]}>
              <EditorIcons.UploadImgIcon />
              <span className="sr-only">Upload image</span>
            </GyButton>
          </div>
          <GyButton size={["sm"]} type="submit" className="post-btn">
            Submit
          </GyButton>
        </div>
      </div>
    </form>
  );
};

const CommentItem = ({ data }) => {
  const { content, createdAt, user } = data;
  const [commentBoxOpened, setCommentBoxOpened] = useState(false);
  const [liked, setLiked] = useState(false);
  const value = {
    comment: {
      commentBoxOpened,
      setCommentBoxOpened,
      commentCount: 5,
    },
    like: { liked, setLiked, likeCount: 5 },
  };
  return (
    <div className="comments-item">
      <section className="top">
        <UserHeader user={user} size="sm" />
        <GyTime date={createdAt} className="date text-xs" />
      </section>
      <p className="mid">{content}</p>
      {/* <section className="bot">
        <commentContext.Provider value={value}>
          <ActionsBox />
        </commentContext.Provider>
      </section> */}
    </div>
  );
};

const CommentList = ({ momentComments }) => {
  return (
    <section className="comments-list">
      <CommentInput />
      <hr />
      <h2 className="title">
        Comments{" "}
        {momentComments.length && <span>({momentComments.length})</span>}
      </h2>
      <div className="comments-content">
        {momentComments.map((item) => {
          return <CommentItem data={item} key={item.id} />;
        })}
      </div>
    </section>
  );
};

export default CommentList;
