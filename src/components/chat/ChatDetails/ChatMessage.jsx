import React from "react";
import GyAvatar from "../../../ui/GyAvatar/GyAvatar";
// default avatar img
import defaultAvatar from "../../../assets/imgs/avatar/default-avatar.jpg";
import classNames from "classnames";

const ChatMessage = ({ data, ...props }) => {
  const { content, conversationId, createAt, id, sender, senderId } = data;
  const avatar = sender?.avatar || defaultAvatar;
  return (
    <div className={classNames(["chatroom-messages__item", "right"])}>
      <div className="chatroom-messages__item--avatar">
        <GyAvatar src={avatar} alt={data?.username + "-avatar"} />
      </div>
      <div
        className={classNames(["chatroom-messages__item--content", "right"])}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
