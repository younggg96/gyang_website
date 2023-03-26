import React, { useRef, useState } from "react";
import GyButton from "../../ui/GyButton/GyButton";
import EditorIcons from "./EditorIcons";
import EmojiPicker from "emoji-picker-react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import "./index.scss";
import { getTheme } from "../../helper/theme";
import classNames from "classnames";

const AddEmojiBtn = ({ emojiClickHandler, emojiPopupPosition = "left" }) => {
  const [open, setOpen] = useState(false);
  const clickOutsideRef = useRef();
  useOnClickOutside(clickOutsideRef, () => setOpen(false));

  return (
    <div className="add-emoji-btn">
      <GyButton
        type="button"
        size={["sm", "round"]}
        click={() => setOpen(!open)}
      >
        <EditorIcons.EmojiIcon />
        <span className="sr-only">Add Emoji</span>
      </GyButton>
      {open && (
        <div
          className={classNames(["emoji-popup", emojiPopupPosition])}
          ref={clickOutsideRef}
        >
          <EmojiPicker
            theme={getTheme()}
            onEmojiClick={(e) => emojiClickHandler(e)}
          />
        </div>
      )}
    </div>
  );
};

export default AddEmojiBtn;
