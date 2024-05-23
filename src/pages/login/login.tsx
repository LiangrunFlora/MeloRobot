import login from "@/apis/login";
import useLogin from "@/static/useShowLogin";
import useRegister from "@/static/useShowRegister";
import useUserInfo from "@/static/useUserInfo";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const { setRegister } = useRegister();
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState<boolean>(false);

  const { setUserInfo } = useUserInfo();
  const { setLogin } = useLogin();

  useEffect(() => {
    // 添加事件监听器
    const handleBackgroundClick = (event: MouseEvent) => {
      // 这里的 "backgroundElement" 是最外层的 div 的 id
      const backgroundElement = document.getElementById("backgroundElement");
      if (event.target === backgroundElement) {
        // 执行你想要的操作，比如关闭模态框或返回上一页面
        console.log("点击了空白区域");
        setLogin(false);
        // navigate(-1); // 例如，返回上一页
      }
    };

    document.addEventListener("click", handleBackgroundClick);

    // 清理函数
    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
  }, []);

  function handleAccountChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setAccount(value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setPassword(value);
  }

  const { mutate: lgn } = useMutation({
    mutationFn: login,
    onSuccess: (json) => {
      const userData = json.data;
      console.log(userData);
      setUserInfo({
        id: userData.id,
        account: userData.account,
        username: userData.username,
        email: userData.email,
        head_image: userData.head_image,
      });
      toast.dismiss();
      toast.success("登陆成功");
      setLogin(false);
      toast.dismiss();
      // 拉取图书信息
    },
  });

  function handleLoginClick(event: React.MouseEvent): void {
    event.preventDefault();
    lgn({ account, password });
    toast.loading(<b>正在登陆...</b>);
  }

  return (
    <div>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75">
        <div className="flex h-screen items-center justify-center">
          {/* <div className="text-6xl text-white">Loading...</div> */}
          <div
            id="backgroundElement"
            className="hero min-h-screen bg-gray-900 bg-opacity-75"
          >
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center ">
                <h1 className="text-5xl font-bold text-stone-100">登 录</h1>
                <p className="whitespace-nowrap py-6 font-semibold text-stone-200">
                  登入进入图书馆，浏览图书并进行图书借阅
                </p>
              </div>

              <div className="card w-full max-w-md shrink-0 bg-base-100 shadow-2xl">
                <label className="label px-4 pt-4">
                  <div role="tablist" className="tabs-boxed tabs">
                    <a
                      role="tab"
                      className={type ? "tab" : "tab tab-active"}
                      onClick={() => setType(false)}
                    >
                      帐号登陆
                    </a>
                    <a
                      role="tab"
                      className={!type ? "tab" : "tab tab-active"}
                      onClick={() => setType(true)}
                    >
                      邮箱登陆
                    </a>
                  </div>
                  <div>
                    <a
                      className="link text-end text-base text-blue-700"
                      onClick={() => {
                        setLogin(false);
                        setRegister(true);
                      }}
                    >
                      没有帐号？注册
                    </a>
                  </div>
                </label>

                {type ? (
                  <form className="card-body">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">邮箱</span>
                      </label>

                      <label className="input input-bordered flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path
                            fillRule="evenodd"
                            d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <input
                          type="text"
                          className="grow"
                          placeholder="email"
                          value={account}
                          onChange={handleAccountChange}
                        />
                      </label>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">验证码</span>
                      </label>
                      <label className="input input-bordered flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <input
                          type="password"
                          className="grow"
                          placeholder="Verification"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <span>
                          <button className="glass btn-sm whitespace-nowrap rounded-xl bg-sky-600 font-serif text-xs text-stone-900 hover:bg-stone-500">
                            获取验证码
                          </button>
                        </span>
                      </label>
                    </div>

                    <div className="form-control mt-6">
                      <button
                        className="btn glass bg-emerald-600 hover:bg-stone-400"
                        disabled={!(account !== "" && password !== "")}
                        onClick={handleLoginClick}
                      >
                        登陆
                      </button>
                    </div>
                  </form>
                ) : (
                  <form className="card-body">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">帐号</span>
                      </label>
                      <label className="input input-bordered flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input
                          type="text"
                          className="grow"
                          placeholder="Account"
                          value={account}
                          onChange={handleAccountChange}
                        />
                      </label>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">密码</span>
                      </label>
                      <label className="input input-bordered flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <input
                          type="password"
                          className="grow"
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <span className="text-sm text-red-500">{}</span>
                      </label>
                    </div>

                    <div className="form-control mt-6">
                      <button
                        className="btn glass bg-emerald-600 hover:bg-stone-400"
                        disabled={!(account !== "" && password !== "")}
                        onClick={handleLoginClick}
                      >
                        登陆
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
