import useShowNotify from "@/static/useShowNotify";
import { useEffect, useRef, useState } from "react";
import Li from "./li";
import useUserInfo from "../../../static/useUserInfo";
import { useMutation } from "@tanstack/react-query";
import get_notify from "@/apis/get_notify_list";
import toast from "react-hot-toast";
import ShowNotify from "@/components/show_notify";
import AddNew from "@/components/add_new";

function Drawer() {
  const { showNotify, setShowNotify } = useShowNotify();
  const [notifyList, setNotifyList] = useState<Notify[]>([]);
  const labelRef = useRef(null);
  useEffect(() => {
    if (labelRef.current) {
      labelRef.current.click(); // 使用Ref模拟点击
    }
  }, [showNotify]);

  const { userInfo } = useUserInfo();

  const { mutate: getNotify } = useMutation({
    mutationFn: get_notify,
    onSuccess: (result) => {
      setNotifyList(result.data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    const id = userInfo.id;
    if (id !== -1) {
      getNotify(id);
    }
  }, [userInfo, getNotify]);

  return (
    <div>
      <div className="drawer">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button hidden"
            ref={labelRef}
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side w-64">
          <ul className="menu min-h-full w-64 bg-base-200 p-4 text-base-content ">
            <li className="">
              <div className="flex justify-between">
                <button
                  className=""
                  onClick={() => {
                    setShowNotify(!showNotify);
                  }}
                >
                  <ShowNotify />
                </button>
                <button>
                  <AddNew />
                </button>
              </div>
            </li>
            {notifyList.map((notify, index) => (
              <li key={index}>
                <Li key={notify.id} id={notify.id}>
                  {notify.title}
                </Li>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
