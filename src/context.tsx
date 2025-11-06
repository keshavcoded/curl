import { createContext, useEffect, type ReactNode } from "react";
import { useFetch } from "./hooks/useFetch";
import { getCurrentUser } from "./lib/api/auth.api";
import type { AppContextTypes } from "./lib/types";

const AppContext = createContext<AppContextTypes | null>(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    loading,
    error,
    fn: fetchuser,
  } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchuser();
  }, []);

  return (
    <AppContext.Provider
      value={{ user, fetchuser, loading, error, isAuthenticated }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
export { AppContext };
