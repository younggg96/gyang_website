import React, { useState } from "react";
import { useCycle } from "framer-motion";
import "./index.scss";
// icons
import EditorIcons from "./EditorIcons";
// components
import AddEmojiBtn from "./AddEmojiBtn";
// form
import { useForm, Controller } from "react-hook-form";
// ui
import GyModal from "../../ui/GyModal/GyModal";
import GyUploader, {
  GyUploaderPreviewer,
  MAX_UPLOAD_IMG_NUM,
} from "../../ui/GyUploader/GyUploader";
import GyButton from "../../ui/GyButton/GyButton";
import GyTextarea from "../../ui/GyTextarea/GyTextarea";
import { TIME, TYPE, useToast } from "../../ui/GyToast/ToastProvider";
import { useRequest } from "ahooks";
// apis
import { uploadImgs } from "../../api/upload";
import { createMoment } from "../../api/moments";

const EditorInput = ({ updateMomentList }) => {
  const [isImgUploaderOpen, toggleImgUploaderOpen] = useCycle(false, true);

  const { addToast } = useToast();
  const [uploadedImgs, setUploadedImgs] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const momentValue = watch("moment");

  // apis
  const uploadImgsRequest = useRequest(uploadImgs, {
    manual: true,
  });
  const createMomentRequest = useRequest(createMoment, {
    manual: true,
    onSuccess: (res) => {
      addToast({
        content: "Post moment successfully!",
        time: TIME.SHORT,
        type: TYPE.SUCCESS,
      });
      updateMomentList();
    },
  });

  const onSubmit = (data) => {
    addToast({
      content: "Your moment is posting...",
      time: TIME.SHORT,
      type: TYPE.INFO,
    });
    uploadImgsRequest
      .runAsync(uploadedImgs)
      .then((imgs) => {
        createMomentRequest.run({
          content: data.moment,
          imgs: imgs?.data.map((item) => item.url),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const emojiClickHandler = (e) => {
    setValue("moment", `${momentValue ? momentValue : ""}${e.emoji}`);
  };

  // img uploader
  const handleFileChange = (files) => {
    toggleImgUploaderOpen();
    if (uploadedImgs.length === MAX_UPLOAD_IMG_NUM) {
      addToast({
        content:
          "Maximum number of images (9) has been reached. You cannot add more images.",
        time: TIME.LONG,
        type: TYPE.WARNING,
      });
      return;
    } else {
      addToast({
        content: "Image added successfully!",
        time: TIME.SHORT,
        type: TYPE.SUCCESS,
      });
      setUploadedImgs([...uploadedImgs, ...files]);
    }
  };
  const handleFileRemove = (file) => {
    const updatedList = [...uploadedImgs];
    updatedList.splice(uploadedImgs.indexOf(file), 1);
    setUploadedImgs(updatedList);
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
          {uploadedImgs.length > 0 && (
            <>
              <hr />
              <div className="editor-imgs-previewer">
                <GyUploaderPreviewer
                  fileList={uploadedImgs}
                  fileRemove={() => handleFileRemove()}
                />
              </div>
            </>
          )}
        </div>
        <div className="editor-bot">
          {errors.moment ? (
            <div className="editor-bot__text">
              <p className="error-msg">{errors.moment.message}</p>
            </div>
          ) : errors.imgs ? (
            <div className="editor-bot__text">
              <p className="error-msg">{errors.imgs.message}</p>
            </div>
          ) : null}
          <div className="editor-bot__btns">
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
                  <Controller
                    name="imgs"
                    control={control}
                    form={register("imgs", {
                      required: "Moment imgs are required.",
                    })}
                    render={({ field }) => {
                      return (
                        <GyUploader
                          onFileChange={(files) => {
                            field.onChange(files);
                            handleFileChange(files);
                          }}
                          type="multiple"
                        />
                      );
                    }}
                  />
                </GyModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditorInput;
