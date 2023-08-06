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
import { BsThreeDotsVertical } from "react-icons/bs";
// scss
import "./index.scss";
// default avatar img
import defaultAvatar from "../../assets/imgs/avatar/default-avatar.jpg";
// apis
import { getTopUserList } from "../../api/user";
import { getConversation } from "../../api/conversation";

const ChatRoom = ({ selectedUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeItem, setActiveItem] = useState({ id: null, avatar: "" });
  const { state } = useAuth();

  const [userList, setUserList] = useState([]);
  const { error, loading, run } = useRequest(getTopUserList, {
    manual: true,
    onSuccess: (result, params) => {
      setUserList(result?.data);
    },
  });

  const getConversationRequest = useRequest(getConversation, {
    manual: true,
    onSuccess: (result, params) => {
      setUserList(result?.data);
      // console.log(result);
    },
  });

  useEffect(() => {
    run(1);
  }, []);
  // web socket
  const socket = io(BASE_SERVER_URL, {
    query: {
      userId: state.user.id, // 将用户标识信息作为查询参数发送到服务器
    },
  });

  useEffect(() => {
    getConversationRequest.run(1);
  }, []);

  // 处理接收到新消息的事件
  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      // setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (data) => {
    setNewMessage(data["chat-input"]);
    socket.emit("message", {
      senderId: selectedUserId,
      conversationId: 1,
      content: data["chat-input"],
    });
    // setNewMessage("");
  };
  return (
    <GyCard title={"Chat"}>
      <div className="chatroom">
        <section className="chatroom-contact">
          <header className="chatroom-contact__header title">Messages</header>
          <ChatContactList
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            userList={userList}
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
          <div className="chatroom-messages__details">
            {/* {messages.map((message, index) => (
              <div key={index}>{message}</div>
            ))} */}
          </div>
          <ChatEditor onSubmit={handleSendMessage} />
        </section>
      </div>
    </GyCard>
  );
};

export default ChatRoom;
