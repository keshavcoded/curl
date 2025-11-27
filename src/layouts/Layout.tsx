import { useTheme } from "@/components/ThemeProvider";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

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
      <Footer />
    </div>
  );
};

export default Layout;
