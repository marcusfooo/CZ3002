import React, { useContext, useEffect } from "react";
import {
  ChatEngine,
  ChatEngineContext,
  getOrCreateChat,
} from "react-chat-engine";
import { Navigate, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import "../styles/Chat.css";
import MyChatCard from "./MyChatCard";

export default function Chat() {
  const { currentUser } = useUser();
  const { chatId } = useParams();
  const { setActiveChat } = useContext(ChatEngineContext);

  useEffect(() => {
    if (chatId) {
      setActiveChat(chatId);
    }
  }, [chatId, setActiveChat]);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="chat-box">
      <ChatEngine
        height="100%"
        publicKey={"966dcf77-9468-42f4-933e-1ccbfb702bb4"}
        userName={currentUser.email}
        userSecret={currentUser.password}
        renderChatSettings={(chatAppState) => null}
        renderChatCard={(chat, index) => (
          <MyChatCard chat={chat} index={`${index}`} />
        )}
      />
    </div>
  );
}
