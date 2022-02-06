import React from "react";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import "../styles/Chat.css";

export default function Chat() {
  const { currentUser } = useUser();

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
      />
    </div>
  );
}
