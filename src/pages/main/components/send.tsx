import add_new_chat, { add_new_draw_chat } from "@/apis/add_new_chat";
import get_message_response, { get_DrawAI_response } from "@/apis/ai_chat";
import get_weather_info from "@/apis/get_weather_info";
import File from "@/components/file";
import useAddNew from "@/static/useAddNew";
import useCurrentDetail from "@/static/useCurrentDetail";
import useCurrentMessages from "@/static/useCurrentMessages";
import useCurrentModel from "@/static/useCurrentModel";
import useNotifyList from "@/static/useNotifyList";
import useSelectFile from "@/static/useSelectFile";
import useUserInfo from "@/static/useUserInfo";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function Send() {
  const [input, setInput] = useState("");
  const { messages, setMessages } = useCurrentMessages();
  const [wait, setWait] = useState(false);
  const { currentDetail, setCurrentDetail } = useCurrentDetail();
  const [abortController, setAbortController] = useState(new AbortController());
  const { userInfo } = useUserInfo();
  const { addNew, setAddNew } = useAddNew();
  const { notifyList, setNotifyList } = useNotifyList();
  const { currentModel } = useCurrentModel();
  const { selectFile, setSelectFile } = useSelectFile();
  const [languange, setLanguage] = useState<string>("简体中文");

  const { mutate: getResponse } = useMutation({
    mutationFn: get_message_response,
    onSuccess: (result) => {
      // 将消息加入到消息列表中，进行添加消息，并允许运行
      const ai_response = result.data;
      const oldMessages = messages;
      const new_message = {
        message: ai_response.message,
        time: new Date().toLocaleTimeString(),
        isUser: false,
      };
      oldMessages.push(new_message);
      setMessages(oldMessages);
      setWait(false);
      setSelectFile("");
      setAddNew(false);
    },
  });

  const { mutate: getDrawAIResponse } = useMutation({
    mutationFn: get_DrawAI_response,
    onSuccess: (result) => {
      // 将消息加入到消息列表中，进行添加消息，并允许运行
      const ai_response = result.data;
      const oldMessages = messages;
      oldMessages.pop();
      const new_message: MessageType = {
        message: ai_response.message,
        time: new Date().toLocaleTimeString(),
        isUser: false,
        message_type: ai_response.message_type,
        extension: ai_response.extension,
      };
      oldMessages.push(new_message);
      setMessages(oldMessages);
      setWait(false);
      setAddNew(false);
    },
  });

  const { mutate: addNewDrawChat } = useMutation({
    mutationFn: add_new_draw_chat,
    onSuccess: (result) => {
      const new_notify = result.data;
      setCurrentDetail(new_notify.id);
      const old_notify_list = [
        {
          id: new_notify.id,
          title: new_notify.title,
          uid: new_notify.uid,
        },
        ...notifyList,
      ];
      setNotifyList(old_notify_list);
      setWait(true);
      const u_message = input;
      setInput("");
      const oldMessages = messages;
      const new_message: MessageType = {
        message: u_message,
        time: new Date().toLocaleTimeString(),
        isUser: true,
        message_type: selectFile === "" ? 0 : 1,
        extension: selectFile,
      };
      oldMessages.push(new_message);
      setMessages(oldMessages);
      const new_message_ai = {
        message: "正在生成图片... 0%",
        time: new Date().toLocaleTimeString(),
        isUser: false,
      };
      oldMessages.push(new_message_ai);
      setMessages(oldMessages);
      let progress = 0;
      getDrawAIResponse({
        uid: userInfo.id,
        text: u_message,
        dialog_id: new_notify.id,
      });
      const interval = setInterval(() => {
        progress += 1;
        if (progress > 99) {
          clearInterval(interval);
          return;
        }
        const updatedMessages = [...oldMessages];
        updatedMessages[updatedMessages.length - 1].message =
          `正在生成图片... ${progress}%`;
        setMessages(updatedMessages);
      }, 120); // 每 0.8 秒更新一次，8 秒内达到 100%
    },
  });

  const { mutate: addNewChat } = useMutation({
    mutationFn: add_new_chat,
    onSuccess: (result) => {
      const new_notify = result.data;
      setCurrentDetail(new_notify.id);
      const old_notify_list = [
        {
          id: new_notify.id,
          title: new_notify.title,
          uid: new_notify.uid,
        },
        ...notifyList,
      ];
      setNotifyList(old_notify_list);
      setWait(true);
      const newAbortController = new AbortController();
      setAbortController(newAbortController);
      console.log("发送请求");
      const u_message = input;
      setInput("");
      const oldMessages = messages;
      const new_message: MessageType = {
        message: u_message,
        time: new Date().toLocaleTimeString(),
        isUser: true,
        message_type: selectFile === "" ? 0 : 1,
        extension: selectFile,
      };
      oldMessages.push(new_message);
      setMessages(oldMessages);
      // 调用发送请求，等待相应，相应后设置wait为false
      getResponse({
        message: u_message,
        uid: userInfo.id,
        detail_id: new_notify.id,
        imageBase64: selectFile,
        // TODO 检查问题
        onMessageReceived: (chunk: string) => {
          const oldMessages = [...messages];
          const new_message = {
            message: chunk,
            time: new Date().toLocaleTimeString(),
            isUser: false,
          };
          oldMessages.push(new_message);
          setMessages(oldMessages);
        },
        setWait: setWait,
        signal: newAbortController.signal,
      });
    },
  });
  function containsWeather(text: string) {
    // 使用正则表达式来检测是否包含"天气"
    const regex = /天气/;
    return regex.test(text);
  }

  const { mutate: getWeatherInfo } = useMutation({
    mutationFn: get_weather_info,
    onSuccess: (result) => {
      const weather_info = result.data.weather_info;
      const oldMessages = messages;
      const new_message: MessageType = {
        message: weather_info,
        time: new Date().toLocaleTimeString(),
        isUser: false,
      };
      oldMessages.push(new_message);
      setMessages(oldMessages);
      setWait(false);
      setAddNew(false);
    },
  });

  function sendMessage() {
    if (wait) {
      // 打断当前请求
      abortController.abort();
      setWait(false);
      return;
    }
    if (addNew) {
      // 首先建立新的title
      if (currentModel === 1) addNewChat({ uid: userInfo.id, title: input });
      else if (currentModel === 2)
        addNewDrawChat({ uid: userInfo.id, title: input });
    } else {
      setWait(true);
      const newAbortController = new AbortController();
      setAbortController(newAbortController);
      console.log("发送请求");
      const u_message = input;
      setInput("");
      const oldMessages = messages;
      const new_message: MessageType = {
        message: u_message,
        time: new Date().toLocaleTimeString(),
        isUser: true,
        message_type: selectFile === "" ? 0 : 1,
        extension: selectFile,
      };
      oldMessages.push(new_message);
      setMessages(oldMessages);
      // 调用发送请求，等待相应，相应后设置wait为false
      if (currentModel === 1) {
        if (containsWeather(u_message)) {
          // 调用天气API
          getWeatherInfo();
          return;
        }
        getResponse({
          message: u_message,
          uid: userInfo.id,
          detail_id: currentDetail,
          imageBase64: selectFile,
          language: languange,
          // TODO 检查问题
          onMessageReceived: (chunk: string) => {
            const oldMessages = [...messages];
            const new_message = {
              message: chunk,
              time: new Date().toLocaleTimeString(),
              isUser: false,
            };
            oldMessages.push(new_message);
            setMessages(oldMessages);
          },
          setWait: setWait,
          signal: newAbortController.signal,
        });
      } else if (currentModel === 2) {
        const oldMessages = [...messages];
        const new_message = {
          message: "正在生成图片... 0%",
          time: new Date().toLocaleTimeString(),
          isUser: false,
        };
        oldMessages.push(new_message);
        setMessages(oldMessages);
        let progress = 0;
        const interval = setInterval(() => {
          progress += 1;
          if (progress > 99) {
            clearInterval(interval);
            return;
          }
          const updatedMessages = [...oldMessages];
          updatedMessages[updatedMessages.length - 1].message =
            `正在生成图片... ${progress}%`;
          setMessages(updatedMessages);
        }, 120); // 每 0.8 秒更新一次，8 秒内达到 100%
        getDrawAIResponse({
          uid: userInfo.id,
          text: input,
          dialog_id: currentDetail,
        });
      }
    }
    setWait(false);
    setSelectFile("");
    setAddNew(false);
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span className="text-sm ">回复语言: </span>
        <div className="x-12 y-16">
          <select
            className="max-h-xs select w-full max-w-xs select-none focus:outline-none"
            value={languange}
            onChange={(e) => {
              console.log(e.target.value);
              setLanguage(e.target.value);
            }}
          >
            <option selected>简体中文</option>
            <option>English</option>
          </select>
        </div>
      </div>
      <div className="flex h-10 w-[675px] items-center justify-between rounded-xl bg-stone-100">
        <div className="flex h-full w-full items-center space-x-1">
          <File />
          <input
            type="text"
            className="h-full grow bg-stone-100 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="flex h-full w-auto items-center">
          <button
            className="disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary mb-1 mr-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white"
            disabled={!wait && input === ""}
            onClick={() => sendMessage()}
          >
            {wait ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="icon-lg"
              >
                <rect
                  width="10"
                  height="10"
                  x="7"
                  y="7"
                  fill="currentColor"
                  rx="1.25"
                ></rect>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 32 32"
                className="icon-2xl"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Send;
