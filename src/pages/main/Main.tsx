import Drawer from "@/pages/main/components/Drawer";
import useShowNotify from "@/static/useShowNotify";
import Header from "@/pages/main/components/header";
import Send from "@/pages/main/components/send";
import Chat from "@/pages/main/components/chat";

function Main() {
  const { showNotify } = useShowNotify();
  return (
    <div>
      <div className="flex h-screen w-screen">
        <Drawer />
        <div
          className={`${
            !showNotify ? "pl-64" : ""
          } flex h-full w-full flex-col pb-8 transition-all duration-300`}
        >
          <div className="h-auto w-full">
            <Header />
          </div>
          <div className="h-full w-full flex-grow overflow-y-auto">
            <Chat />
          </div>
          <div className="flex h-auto w-full items-center justify-center">
            <Send />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
