import React from "react";
import "./index.scss";
import GyAvatar from "../../ui/GyAvatar/GyAvatar";
import useAuth from "../../hooks/useAuth";
import GyTextarea from "../../ui/GyTextarea/GyTextarea";
import GyButton from "../../ui/GyButton/GyButton";
import EditorIcons from "../editor/EditorIcons";

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

const CommentList = () => {
  return (
    <section className="comment-list">
      <CommentInput />
      <hr />
    </section>
  );
};

export default CommentList;
