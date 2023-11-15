import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import classNames from "classnames";

const ChatDetails = ({ messages }) => {
  const messagesDetailsRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom when messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesDetailsRef.current) {
      const scrollContainer = messagesDetailsRef.current;
      const scrollOptions = { behavior: 'smooth' };
  
      // Scroll to the bottom
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        ...scrollOptions,
      });
    }
  };
  

  return (
    <div
      className={classNames(["chatroom-messages__details", "left"])}
      ref={messagesDetailsRef}
    >
      {messages.map((message, index) => {
        return <ChatMessage key={index} data={message} />;
      })}
    </div>
  );
};

export default ChatDetails;
