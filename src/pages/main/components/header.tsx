import AddNew from "@/components/add_new";
import Share from "@/components/share";
import ShowNotify from "@/components/show_notify";
import useShowNotify from "@/static/useShowNotify";
import useUserInfo from "@/static/useUserInfo";

function Header() {
  const { showNotify, setShowNotify } = useShowNotify();
  const { userInfo } = useUserInfo();
  return (
    <div className="h-auto w-full px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showNotify && (
            <>
              <button onClick={() => setShowNotify(!showNotify)}>
                <ShowNotify />
              </button>
              <button>
                <AddNew />
              </button>
            </>
          )}

          <details className="dropdown">
            <summary className="btn m-1 border-none bg-white">选择模型</summary>
            <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
              <li>
                <a>llama&llava</a>
              </li>
              <li>
                <a>DALL-E</a>
              </li>
            </ul>
          </details>
        </div>
        <div className="flex items-center space-x-4">
          <button>
            <Share />
          </button>
          <img
            src={
              userInfo.id === -1
                ? "https://i2.wp.com/cdn.auth0.com/avatars/0.png?ssl=1"
                : userInfo.head_image
            }
            alt="head_iamge"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
