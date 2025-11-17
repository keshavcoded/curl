import supabase from "@/db/supabase";

export async function getAnalytics(url_id: string[]) {
  const { data, error } = await supabase
    .from("analytics")
    .select("*")
    .in("url_id", url_id);

  if (error) {
    console.error(error.message);
    throw new Error("Error while loading analytics");
  }

  return data;
}
