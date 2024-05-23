import Main from "@/pages/main/Main";
import { createBrowserRouter } from "react-router-dom";
import Search from "@/pages/search/Search.tsx";
import Chat from "@/pages/main/components/chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Chat />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);
export default router;
