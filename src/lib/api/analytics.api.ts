import supabase from "@/db/supabase";
import { UAParser } from "ua-parser-js";

export async function getOverallAnalytics(url_id: string[]) {
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

const parser = new UAParser();

export async function getAnalytics({
  id,
  primaryUrl,
}: {
  id: string;
  primaryUrl: string;
}) {
  try {
    const res = parser.getResult();
    const device = res.device.type || "desktop";

    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();

    await supabase.from("analytics").insert({
      url_id: id,
      city: city,
      device: device,
      country: country,
    });

    window.location.href = primaryUrl;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export async function getAnalyticsById(url_id: string | undefined) {
  const { data, error } = await supabase
    .from("analytics")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error.message);
    throw new Error("Error while fetching the analytics");
  }

  return data;
}
