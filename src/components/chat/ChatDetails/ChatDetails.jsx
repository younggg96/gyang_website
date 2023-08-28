import React, { useRef } from "react";
import ChatMessage from "./ChatMessage";
import classNames from "classnames";

const ChatDetails = ({ messages }) => {
  const messagesDetailsRef = useRef(null);

  return (
    <div className={classNames(["chatroom-messages__details", "left"])} ref={messagesDetailsRef}>
      {messages.map((message, index) => {
        return <ChatMessage key={index} data={message} />;
      })}
    </div>
  );
};

export default ChatDetails;
