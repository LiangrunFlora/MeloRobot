import Delete from "@/components/delete";
import Rename from "@/components/rename";
import Share from "@/components/share";
import { ReactNode } from "react";

interface LiProps {
  children: ReactNode;
  id: number;
}

function Li({ children, id }: LiProps) {
  return (
    <div className="flex items-center justify-between">
      <div>{children}</div>
      <details className="dropdown">
        <summary className=""></summary>
        <ul className="menu dropdown-content z-[1] w-auto rounded-box bg-base-100 p-2 text-xs shadow">
          <li>
            <div className="flex">
              <Share />
              <a className="text-nowrap">分享</a>
            </div>
          </li>
          <li>
            <div className="flex">
              <Rename />
              <a className="text-nowrap">重命名</a>
            </div>
          </li>
          <li>
            <div className="flex">
              <Delete />
              <a className="text-nowrap">删除</a>
            </div>
          </li>
        </ul>
      </details>
    </div>
  );
}

export default Li;
