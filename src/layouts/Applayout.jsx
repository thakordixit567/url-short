import Header from "@/components/header";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container ">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 font-slackey text-center bg-[#1A1A1A] mt-10">
        Made with 💗 by Dixit Thakor.
      </div>
    </div>
  );
};

export default AppLayout;