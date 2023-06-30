import React from "react";
import GyAvatar from "../../ui/GyAvatar/GyAvatar";
import GyTextarea from "../../ui/GyTextarea/GyTextarea";
import useAuth from "../../hooks/useAuth";
import { useToast } from "../../ui/GyToast/ToastProvider";
import { useForm } from "react-hook-form";
import AddEmojiBtn from "../editor/AddEmojiBtn";
import GyButton from "../../ui/GyButton/GyButton";
import { InputPropsComment, InputPropsReply } from "./config"

const MomentCommentInput = ({
  type,
  replyObj,
  hideReplyBtn,
  setData,
  ...props
}) => {
  const { state } = useAuth();
  const { user } = state;
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // const obj = {
    //   content: data.comment,
    //   articleId: articleId,
    //   parentId: replyObj.parentId,
    //   replyTo: replyObj.replyTo || "",
    // };
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
              //   loading={loading}
            >
              Submit
            </GyButton>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MomentCommentInput;
