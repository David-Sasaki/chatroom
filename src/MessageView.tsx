import React from "react";
import { Message } from "./types";

interface MessageViewProps {
  message: Message;
}

const MessageView: React.FC<MessageViewProps> = ({ message }) => {
  const copyToClipboard = () => {
    const text = `${process.env.REACT_APP_BASE_CLIENT_URL}/messages`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard: " + text);
      })
      .catch((err) => {
        console.error("Failed to copy text to clipboard: ", err);
      });
  };

  return (
    <div className="message-container">
      <div className="message-box">{message.content}</div>
      <button onClick={copyToClipboard}>Copy Link</button>
    </div>
  );
};

export default MessageView;
