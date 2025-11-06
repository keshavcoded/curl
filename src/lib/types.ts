export type FormDataTypes = {
  email: string;
  password: string;
};

export type AppContextTypes = {
  user: unknown;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  fetchuser: () => void;
};
