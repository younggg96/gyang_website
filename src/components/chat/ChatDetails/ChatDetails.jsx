import React from "react";
import ChatMessage from "./ChatMessage";
import classNames from "classnames";

const ChatDetails = ({ messages }) => {
  return (
    <div className={classNames(["chatroom-messages__details", "left"])}>
      {messages.map((message, index) => {
        return <ChatMessage key={index} data={message} />;
      })}
    </div>
  );
};

export default ChatDetails;
