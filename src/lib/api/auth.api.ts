import supabase, { supabaseUrl } from "@/db/supabase";
import type { FormDataTypes, SignupProps } from "../types";

export const login = async ({ email, password }: FormDataTypes) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const loginWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (!data.session) return null;
    if (error) throw new Error(error.message);
    return data.session?.user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const signup = async ({
  name,
  email,
  password,
  profile_img,
}: SignupProps) => {
  try {
    const filename = `img-${name.split(" ")[0]}-${Math.random()}`;

    const { error: uploadError } = await supabase.storage
      .from("profile_img")
      .upload(filename, profile_img);

    if (uploadError) throw new Error(uploadError.message); //TODO: add react hot toast

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          profile_img: `${supabaseUrl}/storage/v1/public/profile_img/${filename}`,
        },
      },
    });

    if (error) throw new Error(error.message); //TODO: add react hot toast

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
