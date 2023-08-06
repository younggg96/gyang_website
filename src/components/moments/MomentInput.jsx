import React, { useImperativeHandle } from "react";
// ui
import GyAvatar from "../../ui/GyAvatar/GyAvatar";
import GyTextarea from "../../ui/GyTextarea/GyTextarea";
import GyButton from "../../ui/GyButton/GyButton";
// components
import { useForm } from "react-hook-form";
// hooks
import useAuth from "../../hooks/useAuth";
import AddEmojiBtn from "../editor/AddEmojiBtn";
// config
import { InputPropsComment, InputPropsReply } from "./config";
// default avatar img
import defaultAvatar from "../../assets/imgs/avatar/default-avatar.jpg";


const MomentInput = React.forwardRef(
  ({ type, onSubmit, loading, ...props }, ref) => {
    const { state } = useAuth();
    const { user } = state;
    const {
      register,
      handleSubmit,
      reset,
      setValue,
      watch,
      formState: { errors },
    } = useForm();

    const commentValue = watch("comment");

    const emojiClickHandler = (e) => {
      setValue("comment", `${commentValue ? commentValue : ""}${e.emoji}`);
    };

    useImperativeHandle(ref, () => ({
      reset,
    }));

    const avatar = user?.avatar || defaultAvatar;

    return (
      <section className="moment-comment-editor" {...props}>
        <div className="moment-comment-input">
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
  }
);

export default MomentInput;
