import Message from "@/components/message";
import useCurrentMessages from "@/static/useCurrentMessages";
import React from "react";

function Chat() {
  const { messages } = useCurrentMessages();
  return (
    <div className="flex items-center justify-center">
      <div className="w-3/5">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message.message}
            time={message.time}
            isUser={message.isUser}
          />
        ))}
        <Message
          message={"大家早上好!"}
          time={new Date().toLocaleTimeString()}
          isUser={false}
        />
        <Message
          message={"你好啊!"}
          time={new Date().toLocaleTimeString()}
          isUser={true}
        />
      </div>
    </div>
  );
}

export default Chat;
