import Main from "@/pages/main/Main";
import { createBrowserRouter } from "react-router-dom";
import Search from "@/pages/search/Search.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path:"search",
    element:<Search/>,
  }
]);

export default router;
