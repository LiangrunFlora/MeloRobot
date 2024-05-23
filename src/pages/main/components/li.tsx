import get_chat_detail from "@/apis/get_chat_detail";
import get_draw_detail from "@/apis/get_draw_detail";
import Delete from "@/components/delete";
import Rename from "@/components/rename";
import Share from "@/components/share";
import useAddNew from "@/static/useAddNew";
import useCurrentDetail from "@/static/useCurrentDetail";
import useCurrentMessages from "@/static/useCurrentMessages";
import useCurrentModel from "@/static/useCurrentModel";
import { useMutation } from "@tanstack/react-query";
import { ReactNode } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface LiProps {
  children: ReactNode;
  id: number;
}

function Li({ children, id }: LiProps) {
  const { currentModel } = useCurrentModel();
  const { setMessages } = useCurrentMessages();
  const { setCurrentDetail } = useCurrentDetail();
  const { setAddNew } = useAddNew();
  const navigate = useNavigate();
  const { mutate: getChatDetail } = useMutation({
    mutationFn: get_chat_detail,
    onSuccess: (result) => {
      // 对result.data进行解析
      const interaction = result.data;
      const new_messages_list: MessageType[] = [];
      interaction.forEach((props) => {
        const new_message_user: MessageType = {
          message: props.u_message,
          time: props.time,
          isUser: true,
          extension: props.extension,
          message_type: props.message_type,
        };

        const new_message_AI: MessageType = {
          message: props.message,
          time: props.time,
          isUser: false,
        };
        new_messages_list.push(new_message_user);
        new_messages_list.push(new_message_AI);
      });
      setMessages(new_messages_list);
    },
    onError: (error) => {
      toast.error(`发生错误: ${error.message}`);
    },
  });

  const { mutate: getDrawDetail } = useMutation({
    mutationFn: get_draw_detail,
    onSuccess: (result) => {
      // 对result.data进行解析
      const interaction = result.data;
      const new_messages_list: MessageType[] = [];
      interaction.forEach((props) => {
        const new_message_user: MessageType = {
          message: props.u_message,
          time: props.time,
          isUser: true,
        };

        const new_message_AI: MessageType = {
          message: props.message,
          time: props.time,
          isUser: false,
          extension: props.extension,
          message_type: 1,
        };
        new_messages_list.push(new_message_user);
        new_messages_list.push(new_message_AI);
      });
      console.log(new_messages_list);
      setMessages(new_messages_list);
    },
    onError: (error) => {
      toast.error(`发生错误: ${error.message}`);
    },
  });

  function handleShowDetail(): void {
    navigate("/");
    setCurrentDetail(id);
    setAddNew(false);
    if (currentModel === 1) {
      getChatDetail(id);
    } else if (currentModel === 2) {
      // 调用DALL-E显示对话历史
      getDrawDetail(id);
    }
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
    <button
      className="flex items-center justify-between"
      onClick={() => handleShowDetail()}
    >
      <div className="pl-4">{children}</div>
      <details className="dropdown absolute z-50">
        <summary className=""></summary>
        <ul className="menu dropdown-content absolute left-0 z-50 w-auto rounded-box bg-base-100 p-2 text-xs shadow">
          <li>
            <div className="flex" onClick={() => copyMessagesToClipboard()}>
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
    </button>
  );
}

export default Li;
