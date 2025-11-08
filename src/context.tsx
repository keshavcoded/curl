import { createContext, useEffect, type ReactNode } from "react";
import { useFetch } from "./hooks/useFetch";
import { getCurrentUser } from "./lib/api/auth.api";
import type { AppContextTypes } from "./lib/types";
import supabase from "./db/supabase";

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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) fetchuser();
      //TODO:logout reset if needed
    });

    return () => subscription.unsubscribe();
  }, [fetchuser]);

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
