import React from "react";
import GyAvatar from "../../../ui/GyAvatar/GyAvatar";
import GyButton from "../../../ui/GyButton/GyButton";
// default avatar img
import defaultAvatar from "../../../assets/imgs/avatar/default-avatar.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatHeader = ({ activeItem }) => {
  const avatar = activeItem.avatar || defaultAvatar;
  return (
    <div className="chatroom-messages__header">
      <GyAvatar src={avatar} alt={"avatar"} size="lg" />
      <p className="chatroom-messages__header-username">
        {activeItem.username || ""}
      </p>
      <section className="chatroom-messages__header-btns">
        <GyButton
          width={"36px"}
          height={"36px"}
          style={{ padding: "unset" }}
          size={["xs", "round"]}
          icon={() => <BsThreeDotsVertical />}
        ></GyButton>
      </section>
    </div>
  );
};

export default ChatHeader;
