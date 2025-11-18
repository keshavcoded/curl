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
  user: User | null | undefined;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  fetchuser: () => void;
};

export type UrlTypes = {
  id: string;
  title: string;
  primary_url: string;
  short_url: string;
  custom_url: string;
  qrcode: string;
  user_id: string;
  created_at: string;
};
export type creatLinkInputTypes = {
  title: string;
  primaryUrl: string;
  customUrl?: string;
};
export type createUrlTypes = {
  title: string;
  primary_url: string;
  custom_url?: string;
  user_id: string | undefined;
};
