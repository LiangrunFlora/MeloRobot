import AddNew from "@/components/add_new";
import Share from "@/components/share";
import ShowNotify from "@/components/show_notify";
import useAddNew from "@/static/useAddNew";
import useCurrentMessages from "@/static/useCurrentMessages";
import useCurrentModel from "@/static/useCurrentModel";
import useLogin from "@/static/useShowLogin";
import useShowNotify from "@/static/useShowNotify";
import useUserInfo from "@/static/useUserInfo";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Header() {
  const { showNotify, setShowNotify } = useShowNotify();
  const [activeNum, setActivateNum] = useState(1);
  const { setAddNew } = useAddNew();
  const { setCurrentModel, currentModel } = useCurrentModel();
  const { setMessages } = useCurrentMessages();
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const { setLogin } = useLogin();
  function handleHeadBtn(): void {
    if (userInfo.id === 1) {
      setLogin(true);
    } else {
      // 显示设置
    }
  }

  function handleAddNew(): void {
    setAddNew(true);
    setMessages([]);
  }

  const { messages } = useCurrentMessages();

  // 将 messages 复制到剪贴板的函数
  const copyMessagesToClipboard = async () => {
    try {
      const messagesText = messages
        .map((msg) => `${msg.isUser ? "User" : "AI"}: ${msg.message}`)
        .join("\n\n");
      await navigator.clipboard.writeText(messagesText);
      toast.success("已复制到剪贴板", {
        duration: 1000,
      });
    } catch (err) {
      toast.error("复制失败");
      console.error("Could not copy messages: ", err);
    }
  };

  return (
    <div className="h-auto w-full px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showNotify && (
            <>
              <button onClick={() => setShowNotify(!showNotify)}>
                <ShowNotify />
              </button>
              <button onClick={() => handleAddNew()}>
                <AddNew />
              </button>
            </>
          )}

          <details className="dropdown">
            <summary className="btn m-1 border-none bg-white">选择模型</summary>
            <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
              <li>
                <button
                  className={activeNum === 1 ? "active" : ""}
                  onClick={() => {
                    setActivateNum(1);
                    if (currentModel !== 1) setCurrentModel(1);
                  }}
                >
                  llama&llava
                </button>
              </li>
              <li>
                <button
                  className={activeNum === 2 ? "active" : ""}
                  onClick={() => {
                    setActivateNum(2);
                    if (currentModel !== 2) setCurrentModel(2);
                  }}
                >
                  DALL-E
                </button>
              </li>
            </ul>
          </details>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="btn btn-circle btn-ghost btn-md"
            onClick={() => navigate("/search")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button
            className="btn btn-circle btn-ghost btn-md"
            onClick={() => copyMessagesToClipboard()}
          >
            <Share />
          </button>
          <button onClick={() => handleHeadBtn()}>
            <img
              src={
                userInfo.id === 1
                  ? "https://i2.wp.com/cdn.auth0.com/avatars/10.png?ssl=1"
                  : userInfo.head_image
              }
              alt="head_iamge"
              className="h-8 w-8 rounded-full"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
