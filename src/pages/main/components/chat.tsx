import Message from "@/components/message";
import useCurrentMessages from "@/static/useCurrentMessages";
import React from "react";

function Chat() {
  const { messages } = useCurrentMessages();
  return (
    <div className="flex items-center justify-center">
      <div className="w-3/5">
        <Message
          message={"您好，我是Close AI,请问有什么问题吗？"}
          time={new Date().toLocaleTimeString()}
          isUser={false}
        />
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message.message}
            time={message.time}
            isUser={message.isUser}
          />
        ))}
      </div>
    </div>
  );
}

export default Chat;
