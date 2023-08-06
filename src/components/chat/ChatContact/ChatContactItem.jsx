import React from "react";
import GyAvatar from "../../../ui/GyAvatar/GyAvatar";
import GyTime from "../../../ui/GyTime/GyTime";
// default avatar img
import defaultAvatar from "../../../assets/imgs/avatar/default-avatar.jpg";
import classNames from "classnames";

const ChatContactItem = ({ data, click, active }) => {
  const { conversation } = data;
  const sender = conversation.users[1]?.user;
  const avatar = sender?.avatar || defaultAvatar;
  return (
    <section
      className={classNames(["chatroom-contact__item", { active }])}
      onClick={() => click(data)}
    >
      <div className="chatroom-contact__item--avatar">
        <GyAvatar src={avatar} alt={data?.username + "-avatar"} />
      </div>
      <div className="chatroom-contact__item--content">
        <p className="chatroom-contact__item--username">{sender?.username}</p>
        <p className="chatroom-contact__item--content-text">{sender?.username}</p>
      </div>
      <div className="chatroom-contact__item--notification">
        <GyTime
          date={"2023-05-31T10:45:23.395Z"}
          className="chatroom-contact__item--date date"
        />
        <div className="chat-num">5</div>
      </div>
    </section>
  );
};

export default ChatContactItem;
