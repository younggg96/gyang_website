import React from "react";
import "./index.scss";
import EditorIcons from "./EditorIcons";
import AddEmojiBtn from "./AddEmojiBtn";
import { useForm } from "react-hook-form";
import GyButton from "../../ui/GyButton/GyButton";
import GyInput from "../../ui/GyInput/GyInput";
import { useCycle } from "framer-motion";
import GyModal from "../../ui/GyModal/GyModal";
import GyUploader from "../../ui/GyUploader/GyUploader";
import GyTextarea from "../../ui/GyTextarea/GyTextarea";
import UserHeader from "../user/UserHeader";

const EditorInput = () => {
  const [isImgUploaderOpen, toggleImgUploaderOpen] = useCycle(false, true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const emojiClickHandler = (e) => {
    console.log(e);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="editor-wapper">
        <div className="editor-content">
          <GyTextarea
            placeholder="Write a moment..."
            type="text"
            name="moment"
            required={true}
            form={register("moment", {
              required: "Please enter your moment...",
            })}
            hasBorder={false}
          />
        </div>
        <div className="editor-btns">
          <GyButton size={["sm"]} type="submit">
            Post moment
          </GyButton>
          <div className="other-btns">
            <AddEmojiBtn emojiClickHandler={emojiClickHandler} />
            {/* <GyButton size={["sm", "round"]}>
              <EditorIcons.LocationIcon />
              <span className="sr-only">Share Location</span>
            </GyButton> */}
            <div>
              <GyButton
                size={["sm", "round"]}
                click={() => toggleImgUploaderOpen()}
              >
                <EditorIcons.UploadImgIcon />
                <span className="sr-only">Upload image</span>
              </GyButton>
              <GyModal
                isOpen={isImgUploaderOpen}
                toggleOpen={toggleImgUploaderOpen}
                modalClass={"uploader-modal"}
              >
                <GyUploader />
              </GyModal>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditorInput;
