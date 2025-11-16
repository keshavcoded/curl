import type { User } from "@supabase/supabase-js";

export type FormDataTypes = {
  name?: string;
  email: string;
  password: string;
};
export type SignupProps = {
  email: string;
  password: string;
  name?: string;
  profile_img?: string;
};

export type AppContextTypes = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  fetchuser: () => void;
};
