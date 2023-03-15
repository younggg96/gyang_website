import React from "react";
import "./index.scss";
import GyButton from "../../ui/GyButton/GyButton";
// import GyInput from "../../ui/GyInput/GyInput";
import EditorIcons from "./EditorIcons";
import AddEmojiBtn from "./AddEmojiBtn";

const EditorInput = () => {
  const emojiClickHandler = (e) => {
    console.log(e);
  };
  return (
    <form>
      <div className="editor-wapper">
        <div className="editor-content">
          <textarea
            id="moment"
            rows="4"
            placeholder="Write a moment..."
            required
          ></textarea>
          <label htmlFor="moment" className="sr-only">
            Your Moment
          </label>
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
            <GyButton size={["sm", "round"]}>
              <EditorIcons.UploadImgIcon />
              <span className="sr-only">Upload image</span>
            </GyButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditorInput;
