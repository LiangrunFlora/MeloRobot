import register from "@/apis/register";
import Check from "@/components/Check";
import X from "@/components/X";
import useLogin from "@/static/useShowLogin";
import useRegister from "@/static/useShowRegister";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

function Register() {
  const { setRegister } = useRegister();
  const [account, setAccount] = useState<string>("");
  const [phone_number, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [twoPassword, setTwoPassword] = useState<string>("");
  const [passwordWeak, setPasswordWeak] = useState<string>("");
  const [passwordEq, setPasswordEq] = useState<string>("");

  const [accountOk, setAccountOk] = useState<boolean>(false);
  const [phoneOk, setPhoneOk] = useState<boolean>(false);
  const { setLogin } = useLogin();
  function handleAccountChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value.length > 3) {
      setAccountOk(true);
    } else {
      setAccountOk(false);
    }
    setAccount(value);
  }

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const regex =
      /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
    const value = event.target.value;
    setPhone(value);
    if (value.length === 11 && regex.test(value)) {
      //   verifyPhone(value);
      setPhoneOk(true);
    } else {
      setPhoneOk(false);
    }
  }

  useEffect(() => {
    // 添加事件监听器
    const handleBackgroundClick = (event: MouseEvent) => {
      // 这里的 "backgroundElement" 是最外层的 div 的 id
      const backgroundElement = document.getElementById("backgroundElement");
      if (event.target === backgroundElement) {
        // 执行你想要的操作，比如关闭模态框或返回上一页面
        console.log("点击了空白区域");
        setRegister(false);
        // navigate(-1); // 例如，返回上一页
      }
    };

    document.addEventListener("click", handleBackgroundClick);

    // 清理函数
    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
  }, []);

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setPassword(event.target.value);
    if (value.length !== 0 && value.length < 8) {
      setPasswordWeak("密码太弱");
    }
    if (value === "" || value.length >= 8) {
      setPasswordWeak("");
    }
  }

  function handleTwoPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setTwoPassword(value);
    if (value === password) {
      setPasswordEq("");
    } else {
      setPasswordEq("密码不相同");
    }
  }

  const { mutate: reg } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.dismiss();
      toast.success("注册成功! 即将返回登陆界面");
      setTimeout(() => {
        toast.dismiss();
        setRegister(false);
        setLogin(true);
      }, 1000);
    },
  });

  function handleRegisterClick(event: React.MouseEvent) {
    event.preventDefault();
    reg({ account, password, phone_number });
    toast.loading(<b>正在注册...</b>);
  }

  return (
    <div>
      <div>
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75">
          <div className=" flex h-screen items-center justify-center bg-opacity-75">
            <div
              id="backgroundElement"
              className="hero min-h-screen bg-gray-900 bg-opacity-75"
            >
              <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center ">
                  <h1 className="text-5xl font-bold text-stone-100">
                    立即注册!
                  </h1>
                  <p className="whitespace-nowrap py-6 text-stone-200">
                    立即注册加入我们，即刻浏览商店，获取家教或者进行家教！
                  </p>
                </div>
                <div className="card w-full max-w-md shrink-0 bg-base-100 shadow-2xl">
                  <form className="card-body">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">帐号</span>
                      </label>
                      <label className="input input-bordered flex items-center gap-2 ">
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
                          className="grow focus:outline-none"
                          placeholder="Account"
                          value={account}
                          onChange={handleAccountChange}
                        />
                        <div
                          className={twMerge(account === "" ? "hidden" : "")}
                        >
                          {accountOk ? <Check /> : <X />}
                        </div>
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
                          className="grow focus:outline-none"
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <span className="text-sm text-red-500">
                          {password !== "" &&
                            (passwordWeak === "" ? <Check /> : passwordWeak)}
                        </span>
                      </label>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">确认密码</span>
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
                          className="grow focus:outline-none"
                          placeholder="Enter password again"
                          value={twoPassword}
                          onChange={handleTwoPasswordChange}
                        />
                        <span className="text-sm text-red-500">
                          {twoPassword !== "" &&
                            (passwordEq === "" ? <Check /> : passwordEq)}
                        </span>
                      </label>
                    </div>

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
                          className="grow focus:outline-none"
                          placeholder="email"
                          value={phone_number}
                          onChange={handlePhoneChange}
                        />
                        <span>
                          {phone_number !== "" && (phoneOk ? <Check /> : <X />)}
                        </span>
                      </label>
                      <div className="flex justify-between pt-2">
                        <label className="label">
                          <a
                            className="link text-end text-base text-blue-700"
                            onClick={() => {
                              setRegister(false);
                              setLogin(true);
                            }}
                          >
                            返回登陆{" "}
                          </a>
                        </label>

                        <label className="label">
                          <a
                            href="#"
                            className="link-hover link label-text-alt"
                          ></a>
                        </label>
                      </div>
                    </div>

                    <div className="form-control mt-6">
                      <button
                        // className="btn btn-primary"
                        className="btn glass bg-emerald-600 hover:bg-stone-400"
                        disabled={
                          !(
                            phoneOk &&
                            passwordEq === "" &&
                            accountOk &&
                            passwordWeak === ""
                          )
                        }
                        onClick={handleRegisterClick}
                      >
                        注册
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
