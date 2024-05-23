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

function Header() {
  const { showNotify, setShowNotify } = useShowNotify();
  const [activeNum, setActivateNum] = useState(1);
  const { setAddNew } = useAddNew();
  const { setCurrentModel, currentModel } = useCurrentModel();
  const { setMessages } = useCurrentMessages();
  const { userInfo } = useUserInfo();
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
          <button>
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
