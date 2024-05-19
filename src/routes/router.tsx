import Main from "@/pages/main/Main";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
]);

export default router;
