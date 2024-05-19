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
import React from "react";

interface ChatMessageProps {
  message: string;
  time: string;
  isUser?: boolean;
}

function Message({ message, time, isUser = false }: ChatMessageProps) {
  const { userInfo } = useUserInfo();
  return (
    <div className={`${flexItemsStart} ${isUser ? "flex-row-reverse" : ""}`}>
      <img
        src={
          isUser
            ? userInfo.head_image === ""
              ? "https://i2.wp.com/cdn.auth0.com/avatars/0.png?ssl=1"
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
            {message.split("\n").map((line, index, array) =>
              index === array.length - 1 ? (
                line
              ) : (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ),
            )}{" "}
          </p>
        </div>
        <div className={`${textExtraSmall} ${darkTextZinc400} ${marginTop1}`}>
          {time}
        </div>
      </div>
    </div>
  );
}

export default Message;
