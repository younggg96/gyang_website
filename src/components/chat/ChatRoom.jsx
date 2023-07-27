import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ChatRoom = () => {
  return (
    <div>
      <form action="submit">
        <input type="text" />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default ChatRoom;
