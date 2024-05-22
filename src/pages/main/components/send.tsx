import get_message_response from "@/apis/ai_chat";
import File from "@/components/file";
import useCurrentMessages from "@/static/useCurrentMessages";
import useUserInfo from "@/static/useUserInfo";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function Send() {
  const [input, setInput] = useState("");
  const { messages, setMessages } = useCurrentMessages();
  const [wait, setWait] = useState(false);

  const { userInfo } = useUserInfo();
  function sendMessage() {
    console.log("发送请求");
    const u_message = input;
    setInput("");
    const oldMessages = messages;
    const new_message: MessageType = {
      message: u_message,
      time: new Date().toLocaleTimeString(),
      isUser: true,
    };
    oldMessages.push(new_message);
    setMessages(oldMessages);
    // 调用发送请求，等待相应，相应后设置wait为false
    getResponse({
      message: u_message,
      uid: userInfo.id,
    });
    setWait(true);
  }

  const { mutate: getResponse } = useMutation({
    mutationFn: get_message_response,
    onSuccess: (result) => {
      // 将消息加入到消息列表中，进行添加消息，并允许运行
      const ai_response = result.data;
      const oldMessages = messages;
      const new_message = {
        message: ai_response.message,
        time: new Date().toLocaleTimeString(),
        isUser: false,
      };
      oldMessages.push(new_message);
      setMessages(oldMessages);
      setWait(false);
    },
  });

  return (
    <div>
      <div className="flex h-10 w-[675px] items-center justify-between rounded-xl bg-stone-100">
        <div className="flex h-full w-full items-center space-x-1">
          <File />
          <input
            type="text"
            className="h-full grow bg-stone-100 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="flex h-full w-auto items-center">
          <button
            className="disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary mb-1 mr-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white"
            disabled={input === ""}
            onClick={() => sendMessage()}
          >
            {wait ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="icon-lg"
              >
                <rect
                  width="10"
                  height="10"
                  x="7"
                  y="7"
                  fill="currentColor"
                  rx="1.25"
                ></rect>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 32 32"
                className="icon-2xl"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Send;
