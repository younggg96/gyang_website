import React from "react";
import "./index.scss";
import GyButton from "../../ui/GyButton/GyButton";
import GyInput from "../../ui/GyInput/GyInput";
import EditorIcons from "./EditorIcons";

const EditorInput = () => {
  return (
    <form>
      <div className="editor-wapper">
        <div className="editor-content">
          <textarea
            id="Moment"
            rows="4"
            placeholder="Write a moment..."
            required
          ></textarea>
          <label htmlFor="Moment" className="sr-only">
            Your Moment
          </label>
        </div>
        <div className="editor-btns">
          <GyButton size={["sm"]} type="submit">
            Post moment
          </GyButton>
          <div className="other-btns">
            <GyButton size={["sm", "round"]}>
              <EditorIcons.EmojiIcon />
              <span className="sr-only">Attach file</span>
            </GyButton>
            <GyButton size={["sm", "round"]}>
              <EditorIcons.LocationIcon />
              <span className="sr-only">Share Location</span>
            </GyButton>
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
