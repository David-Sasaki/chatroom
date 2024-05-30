import React, { useEffect, useState } from "react";
import MessageView from "./MessageView";
import { Message } from "./types";
import { createMessage, readMessages } from "./utils";

const Main: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    readMessages().then((data) => {
      setMessages(data);
    });
  }, []);

  const handlePress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const newMessage: Message = {
        content: text,
        time: new Date(),
      };
      createMessage(newMessage).then(() => {
        setMessages([...messages, newMessage]);
      });
    }
  };

  return (
    <div>
      <h1>ChatRoom</h1>
      <hr />
      Input a new message:{" "}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handlePress}
      />
      <hr />
      {messages.map((message) => {
        return <MessageView message={message} />;
      })}
    </div>
  );
};

export default Main;
