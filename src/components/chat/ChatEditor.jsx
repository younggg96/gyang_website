import React from "react";
// hooks
import { useForm } from "react-hook-form";
import AddEmojiBtn from "../editor/AddEmojiBtn";
// ui
import GyTextarea from "../../ui/GyTextarea/GyTextarea";
import GyButton from "../../ui/GyButton/GyButton";

const ChatEditor = ({ onSubmit, loading, ...props }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const chatContentValue = watch("chat-input");

  const emojiClickHandler = (e) => {
    setValue(
      "chat-input",
      `${chatContentValue ? chatContentValue : ""}${e.emoji}`
    );
  };

  const onSubmitHandler = () => {
    handleSubmit(onSubmit);
    reset()
  }

  return (
    <section className="chatroom-editor" {...props}>
      <form className="chatroom-editor__form" onSubmit={onSubmitHandler}>
        <GyTextarea
          placeholder="Typing here..."
          required={true}
          type="text"
          form={register("chat-input", {
            required: "Please enter...",
          })}
          hideLabel="chat-input"
        />
        {errors.comment && (
          <p className="error-msg">{errors.comment.message}</p>
        )}
        <div className="chat-input-btn">
          <div className="chat-input-btn__icon">
            <AddEmojiBtn
              emojiClickHandler={emojiClickHandler}
              emojiPopupPosition="right"
            />
          </div>
          <GyButton
            size={["sm"]}
            className="chat-input-btn__submit"
            type="submit"
            loading={loading}
          >
            Submit
          </GyButton>
        </div>
      </form>
    </section>
  );
};

export default ChatEditor;
