// Shared Tailwind CSS classes
const roundedFull = "rounded-full";
const textSmall = "text-sm";
const textExtraSmall = "text-xs";
const marginY1 = "mb-1";
const marginTop1 = "mt-1";
const darkTextZinc400 = "dark:text-zinc-400";
const flexItemsStart = "flex items-start mb-4";
import puad from "@/resources/puad.png";
import useUserInfo from "@/static/useUserInfo";
import ReactMarkdown from "react-markdown";
import React from "react";
import MessageRenderer from "./markdown";
import Copy from "./copy";
import toast from "react-hot-toast";

interface ChatMessageProps {
  message: string;
  time: string;
  extension?: string;
  message_type?: number;
  isUser?: boolean;
}

// 将 Base64 编码的图片转换为 Blob
const base64ToBlob = (base64Data: string, contentType: string) => {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

function Message({
  message,
  time,
  extension = "",
  message_type = 0,
  isUser = false,
}: ChatMessageProps) {
  const { userInfo } = useUserInfo();

  // 复制消息内容到剪贴板的函数
  const copyToClipboard = async () => {
    try {
      if (message_type === 1 && extension) {
        const base64Data = extension.replace(
          /^data:image\/(png|jpeg|jpg);base64,/,
          "",
        );
        const contentType =
          extension.match(/^data:(.*?);base64,/)?.[1] || "image/png";
        const blob = base64ToBlob(base64Data, contentType);
        const item = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([item]);
        console.log("Image copied to clipboard!");
      } else {
        await navigator.clipboard.writeText(message);
        toast.success("复制成功", {
          duration: 500,
        });
        console.log("Message copied to clipboard!");
      }
    } catch (err) {
      console.error("Could not copy text or image: ", err);
    }
  };
  return (
    <div className={`${flexItemsStart} ${isUser ? "flex-row-reverse" : ""}`}>
      <img
        src={
          isUser
            ? userInfo.head_image === ""
              ? "https://i2.wp.com/cdn.auth0.com/avatars/10.png?ssl=1"
              : userInfo.head_image
            : puad
        }
        alt={isUser ? userInfo.username : "AI"}
        className={`${roundedFull} ${isUser ? "ml-3" : "mr-3"} h-10 w-10`}
      />
      <div className={`${isUser ? "text-right" : ""}`}>
        <div
          className={`${textSmall} ${isUser ? "text-zinc-600" : "text-zinc-600"} ${darkTextZinc400} ${marginY1}`}
        >
          {isUser
            ? userInfo.username === ""
              ? "用户"
              : userInfo.username
            : "AI"}
        </div>
        <div
          className={`bg-${isUser ? "blue-500" : "white"} dark:bg-${isUser ? "blue-500" : "zinc-700"} rounded-xl p-2 shadow`}
        >
          <p
            className={`${isUser ? "" : "text-zinc-800 dark:text-white"} font-serif text-base font-light tracking-normal`}
          >
            {message_type === 1 && (
              <>
                <img src={extension} alt={message} />
                <br />
              </>
            )}
            {message_type === 2 && (
              <>
                //TODO 等待完成图片显示
                <br />
              </>
            )}
            {message.split("\n").map((line, index, array) =>
              index === array.length - 1 ? (
                line
              ) : (
                <React.Fragment key={index}>
                  <MessageRenderer messages={line} />
                  <br />
                </React.Fragment>
              ),
            )}
          </p>
        </div>
        <div
          className={`${textExtraSmall} ${darkTextZinc400} ${marginTop1} flex items-center space-x-2`}
        >
          <Copy handleFunction={copyToClipboard} />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;
