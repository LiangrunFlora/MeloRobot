import { useEffect } from "react";
import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import getAISearch from "@/apis/AISearch/AISearch.tsx";
import useSummaryMessages from "@/static/useSummaryMsg.tsx";
import toast from "react-hot-toast";
// import Search, { SearchProps } from "antd/es/input/Search";
// import { AudioOutlined } from '@ant-design/icons';


type HashParams = {
  [key: string]: string;
};
const SearchList = () => {
  const { setSummaryMessages } = useSummaryMessages();
  const { mutate: getAISummary } = useMutation({
    mutationFn: getAISearch,
    onSuccess: (data) => {
      toast.dismiss()
      console.log(data.data);
      setSummaryMessages(data.data as SearchType);

    },
    onError: (error) => {
      console.log(error);
    }
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://cse.google.com/cse.js?cx=a7888bc0822484f21";
    document.body.appendChild(script);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    //监听url变化并获取查询字符串
    console.log("changed");
    const hash = window.location.hash;
    if (hash) {
      // 移除开头的#号
      const paramsString = hash.slice(1);
      //手动解析参数
      const params: HashParams = {};
      const pairs = paramsString.split("&");
      pairs.forEach(pair => {
        const [key, value] = pair.split("=");
        params[key] = decodeURIComponent(value || ""); // 解码值
      });
      // 获取gsc.q参数的值
      const gscQ = params["gsc.q"];

      if (gscQ) {
        const searchMsg = decodeURIComponent(gscQ);
        console.log(searchMsg);
        getAISummary(searchMsg);
      }
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // const suffix = (
  //   <AudioOutlined
  //     style={{
  //       fontSize: 16,
  //       color: '#1677ff',
  //     }}
  //   />
  // );

  // const onSearch: SearchProps["onSearch"] = async(
  //   value) => {
  //   // const newUrl = `http://localhost:3000/search/?q=${value}`;
  //   // window.location.href = newUrl;
  //   // try {
  //   //   // 等待两个异步请求都完成
  //   //   await Promise.all([
  //   //     // 这里放第一个异步请求
  //   //     getAISummary(value),
  //   //     // 这里放第二个异步请求
  //   //     // 如果有其他需要等待的异步请求，也可以放在这里
  //   //   ]);
  //   //   console.log('Both requests completed');
  //   // } catch (error) {
  //   //   console.error('Error occurred:', error);
  //   // }
  //   //
  //   // console.log('Search term:', value);
  //   try {
  //     // 这里放第一个异步请求
  //     await getAISummary(value);
  //     console.log('First request completed');
  //
  //     // 更新 URL，导致页面重定向和重新加载
  //     const newUrl = `http://localhost:3000/search/?q=${value}`;
  //     window.location.href = newUrl;
  //
  //     console.log('Search term:', value);
  //   } catch (error) {
  //     console.error('Error occurred:', error);
  //   }
  // }
  //
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "60%"
        }}
      >
        <Box
          sx={{
            width: "80%" // 设置 div 的宽度
          }}
        >
          <div className="gcse-search"></div>
          {/*<Search*/}
          {/*  placeholder="input search text"*/}
          {/*  enterButton="Search"*/}
          {/*  size="large"*/}
          {/*  suffix={suffix}*/}
          {/*  onSearch={onSearch}*/}
          {/*/>*/}
          {/*<script async src="https://cse.google.com/cse.js?cx=YOUR_ENGINE_ID"></script>*/}
          {/*<div className="gcse-searchresults-only"></div>*/}
        </Box>
      </Box>
    </>
  );
};

export default SearchList;