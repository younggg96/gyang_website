import React from "react";
import GyAvatar from "../../../ui/GyAvatar/GyAvatar";
// default avatar img
import defaultAvatar from "../../../assets/imgs/avatar/default-avatar.jpg";
import classNames from "classnames";
import useAuth from "../../../hooks/useAuth"

const ChatMessage = ({ data, ...props }) => {
  const { content, conversationId, createAt, id, sender, senderId } = data;
  const { state } = useAuth();
  const avatar = sender?.avatar || defaultAvatar;
  const senderClass = state.user.id === senderId ? "right" : "left";

  return (
    <div className={classNames(["chatroom-messages__item", senderClass])}>
      <div className="chatroom-messages__item--avatar">
        <GyAvatar src={avatar} alt={data?.username + "-avatar"} />
      </div>
      <div
        className={classNames(["chatroom-messages__item--content", senderClass])}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
