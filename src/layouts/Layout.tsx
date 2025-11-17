import { useTheme } from "@/components/ThemeProvider";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "dark"
          ? "selection:bg-white selection:text-black"
          : "selection:text-white selection:bg-black"
      }`}
    >
      <Toaster position="bottom-center" reverseOrder={true} />
      <main className="min-h-screen">
        <Header />
        <Outlet />
      </main>
      <footer className="p-10 text-center mt-10">Made by Keshav</footer>
    </div>
  );
};

export default Layout;
