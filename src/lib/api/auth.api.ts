import supabase from "@/db/supabase";

type LoginParams = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginParams) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (!data.session) return null;
  if (error) throw new Error(error.message);
  return data.session?.user;
};
