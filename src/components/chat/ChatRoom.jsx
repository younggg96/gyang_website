import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { BASE_SERVER_URL } from "../../api";
// hooks
import { useRequest } from "ahooks";
import useAuth from "../../hooks/useAuth";
// ui
import GyCard from "../../ui/GyCard/GyCard";
// components
import ChatEditor from "./ChatEditor";
import ChatContactList from "./ChatContact/ChatContactList";
// icons
import { IoMdChatbubbles } from "react-icons/io";
// scss
import "./index.scss";
// apis
import { getConversation, getMessages } from "../../api/chat";
import ChatDetails from "./ChatDetails/ChatDetails";
import ChatHeader from "./ChatHeader/ChatHeader";
import { colors } from "../../config";

const ChatRoom = ({ selectedUserId }) => {
  const [messages, setMessages] = useState([]);
  const [activeItem, setActiveItem] = useState({
    conversationId: null,
  });
  const [conversationList, setConversationList] = useState([]);
  const { state } = useAuth();

  const getConversationRequest = useRequest(getConversation, {
    manual: true,
    onSuccess: (result, params) => {
      setConversationList(result?.data);
    },
  });
  const getMessagesRequest = useRequest(getMessages, {
    manual: true,
    onSuccess: (result, params) => {
      setMessages(result?.data);
    },
  });
  // web socket
  const socket = io(BASE_SERVER_URL, {
    query: {
      userId: state.user.id, // 将用户标识信息作为查询参数发送到服务器
    },
  });

  useEffect(() => {
    getConversationRequest.run(1);
    if (activeItem?.conversationId) {
      getMessagesRequest.run(activeItem?.conversationId);
    }
  }, [activeItem]);

  // 处理接收到新消息的事件
  useEffect(() => {
    socket.on("message", (message) => {
      if (activeItem?.conversationId === message.conversationId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [activeItem]);

  const handleSendMessage = (data) => {
    socket.emit("message", {
      senderId: selectedUserId,
      conversationId: activeItem.conversationId,
      content: data["chat-input"],
    });
  };
  return (
    <GyCard title={"Chat"}>
      <div className="chatroom">
        <section className="chatroom-contact">
          <header className="chatroom-contact__header title">Messages</header>
          <ChatContactList
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            conversationList={conversationList}
          />
        </section>
        <section className="chatroom-messages">
          {activeItem.conversationId ? (
            <>
              <ChatHeader activeItem={activeItem} />
              <ChatDetails messages={messages} />
              <ChatEditor onSubmit={handleSendMessage} />
            </>
          ) : (
            <div className="chatroom-messages__no-chat-icon">
              <IoMdChatbubbles
                style={{
                  width: "60px",
                  height: "60px",
                  color: colors.primaryDark,
                }}
              />
            </div>
          )}
        </section>
      </div>
    </GyCard>
  );
};

export default ChatRoom;
