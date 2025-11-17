import supabase from "@/db/supabase";

export async function getUrls(user_id: string | undefined) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.log(error.message);
    throw new Error("Error while loading urls");
  }

  return data;
}
