import { Navigate } from "react-router-dom";
import { useAppContext } from "@/useAppContext";
import { BounceLoader } from "react-spinners";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAppContext();

  console.log("auth loading", loading);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <BounceLoader color="#888" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
