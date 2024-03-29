import React from "react";
import ChatContactItem from "./ChatContactItem";

const ChatContactList = ({ activeItem, setActiveItem, conversationList }) => {
  const clickHandler = (item) => {
    setActiveItem({ ...item.conversation.users[1]?.user, conversationId: item.conversationId });
  };

  return (
    <div className="chatroom-contact__list">
      {conversationList.map((item, index) => {
        return (
          <ChatContactItem
            data={item}
            key={index}
            click={clickHandler}
            active={activeItem.conversationId === item.conversationId}
          />
        );
      })}
    </div>
  );
};

export default ChatContactList;
