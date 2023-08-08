import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { BASE_SERVER_URL } from "../../api";
// hooks
import { useRequest } from "ahooks";
import useAuth from "../../hooks/useAuth";
// ui
import GyCard from "../../ui/GyCard/GyCard";
import GyAvatar from "../../ui/GyAvatar/GyAvatar";
import GyButton from "../../ui/GyButton/GyButton";
// components
import ChatEditor from "./ChatEditor";
import ChatContactList from "./ChatContact/ChatContactList";
// icons
import { BsThreeDotsVertical } from "react-icons/bs";
// scss
import "./index.scss";
// default avatar img
import defaultAvatar from "../../assets/imgs/avatar/default-avatar.jpg";
// apis
import { getConversation, getMessages } from "../../api/chat";
import ChatDetails from "./ChatDetails/ChatDetails";

const ChatRoom = ({ selectedUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeItem, setActiveItem] = useState({
    conversationId: 1,
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
    if (activeItem?.conversationId) {
      getMessagesRequest.run(activeItem?.conversationId);
      getConversationRequest.run(1);
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
    setNewMessage(data["chat-input"]);
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
          <div className="chatroom-messages__header">
            <GyAvatar
              src={activeItem.avatar || defaultAvatar}
              alt={"avatar"}
              size="lg"
            />
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
          <ChatDetails messages={messages} />
          <ChatEditor onSubmit={handleSendMessage} />
        </section>
      </div>
    </GyCard>
  );
};

export default ChatRoom;
