import { useContext } from "react";
import { AppContext } from "./context";

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("AppContext is null");
  return ctx;
};
