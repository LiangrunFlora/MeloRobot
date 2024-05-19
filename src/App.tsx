import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "@/routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
