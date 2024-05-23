import useSelectFile from "@/static/useSelectFile";
import React, { useRef } from "react";

function File() {
  const fileInputRef = useRef(null);
  const { setSelectFile } = useSelectFile();

  const handleButtonClick = () => {
    fileInputRef?.current?.click(); // 触发文件输入元素的点击事件
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        console.log(base64String);
        setSelectFile(base64String as string);
      };
      reader.readAsDataURL(file); // 将文件读取为Data URL（Base64编码）
    }
  };
  return (
    <button onClick={() => handleButtonClick()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }} // 隐藏文件输入元素
        onChange={handleFileChange}
      />
    </button>
  );
}

export default File;
