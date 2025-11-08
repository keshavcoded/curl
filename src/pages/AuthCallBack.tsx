import supabase from "@/db/supabase";
import { useAppContext } from "@/useAppContext";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthCallBack = () => {
  const navigate = useNavigate();
  const { fetchuser } = useAppContext();
  const [searchParams] = useSearchParams();

  const primaryUrl = searchParams.get("createLink");

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        fetchuser();
        navigate(`/dashboard? ${primaryUrl ? `createLink=${primaryUrl}` : ""}`);
      }

      if (error) {
        console.error("Auth callback error: ", error.message);
        navigate("/login");
        return;
      }

      if (data.session) {
        await fetchuser();
      } else {
        navigate("/login");
      }
    };

    handleAuth();
  }, [navigate, fetchuser, primaryUrl]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-lg font-medium">
      Loggin you with Google...
    </div>
  );
};

export default AuthCallBack;
