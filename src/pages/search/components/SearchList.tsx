import { useEffect } from "react";
import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import getAISearch from "@/apis/AISearch/AISearch.tsx";
import useSummaryMessages from "@/static/useSummaryMsg.tsx";
import toast from "react-hot-toast";
import useSearchLoading from "@/static/useSearchLoading";
// import Search, { SearchProps } from "antd/es/input/Search";
// import { AudioOutlined } from '@ant-design/icons';

type HashParams = {
  [key: string]: string;
};
const SearchList = () => {
  const { setLoading } = useSearchLoading();

  const { setSummaryMessages } = useSummaryMessages();
  const { mutate: getAISummary } = useMutation({
    mutationFn: getAISearch,
    onSuccess: (data) => {
      toast.dismiss();
      console.log(data.data);
      setLoading(false);
      setSummaryMessages(data.data as SearchType);
    },
    onError: (error) => {
      console.log(error);
    },
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
      pairs.forEach((pair) => {
        const [key, value] = pair.split("=");
        params[key] = decodeURIComponent(value || ""); // 解码值
      });
      // 获取gsc.q参数的值
      const gscQ = params["gsc.q"];

      if (gscQ) {
        const searchMsg = decodeURIComponent(gscQ);
        console.log(searchMsg);

        // 设置loading状态
        setLoading(true);
        // 调用检索API
        getAISummary(searchMsg);
      }
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
        }}
      >
        <Box
          sx={{
            width: "80%", // 设置 div 的宽度
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
