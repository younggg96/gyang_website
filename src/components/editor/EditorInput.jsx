import React, { useState } from "react";
import "./index.scss";
import EditorIcons from "./EditorIcons";
import AddEmojiBtn from "./AddEmojiBtn";
import { useForm } from "react-hook-form";
import GyButton from "../../ui/GyButton/GyButton";
import { useCycle } from "framer-motion";
import GyModal from "../../ui/GyModal/GyModal";
import GyUploader, {
  GyUploaderPrevier,
  MAX_UPLOAD_IMG_NUM,
} from "../../ui/GyUploader/GyUploader";
import GyTextarea from "../../ui/GyTextarea/GyTextarea";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";

const EditorInput = () => {
  const [isImgUploaderOpen, toggleImgUploaderOpen] = useCycle(false, true);

  const { addToast } = useToast();
  const [uploadImgs, setUploadImgs] = useState([]);
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

  // img uploader
  const handleFileChange = (files) => {
    toggleImgUploaderOpen();
    if (uploadImgs.length === MAX_UPLOAD_IMG_NUM) {
      addToast({
        content:
          "Maximum number of images (9) has been reached. You cannot add more images.",
        time: TIME.LONG,
        type: TYPE.WARNING,
      });
      return;
    } else {
      addToast({
        content: "Image added successfully.",
        time: TIME.SHORT,
        type: TYPE.SUCCESS,
      });
      setUploadImgs([...uploadImgs, ...files]);
    }
  };
  const handleFileRemove = (file) => {
    const updatedList = [...uploadImgs];
    updatedList.splice(uploadImgs.indexOf(file), 1);
    setUploadImgs(updatedList);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="editor-wapper">
        <div className="editor-content">
          <GyTextarea
            placeholder="Write a moment..."
            type="text"
            name="moment"
            form={register("moment", {
              required: "Please enter your moment...",
            })}
            hasBorder={false}
          />
          {uploadImgs.length > 0 && (
            <>
              <hr />
              <div className="editor-imgs-previewer">
                <GyUploaderPrevier
                  fileList={uploadImgs}
                  fileRemove={() => handleFileRemove()}
                />
              </div>
            </>
          )}
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
                <GyUploader onFileChange={handleFileChange} type="multiple" />
              </GyModal>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditorInput;
