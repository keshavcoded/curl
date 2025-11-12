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
  user: unknown;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  fetchuser: () => void;
};
