import supabase, { supabaseUrl } from "@/db/supabase";
import type { createUrlTypes } from "../types";
import { UAParser } from "ua-parser-js";

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

export async function deleteUrls(id: string) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);
  if (error) {
    console.error(error.message);
    throw new Error("Error while deleting urls");
  }
  return data;
}

export async function createUrl(
  { title, primary_url, custom_url, user_id }: createUrlTypes,
  qrcode: string
) {
  const short_url = Math.random().toString(36).substring(2, 6);
  const fileName = `QR-${short_url}`;

  const blob = await fetch(qrcode).then((res) => res.blob());

  const { error: storageError } = await supabase.storage
    .from("qr_code")
    .upload(fileName, blob, {
      contentType: "image/png",
      upsert: true,
    });

  if (storageError) {
    console.error(storageError);
    throw new Error(storageError.message);
  }

  const qr = `${supabaseUrl}/storage/v1/object/public/qr_code/${fileName}`;

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        primary_url,
        custom_url: custom_url || null,
        user_id,
        short_url,
        qrcode: qr,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Error while creating url");
  }

  return data;
}

export async function getRedirect(id: string | undefined) {
  const { data, error } = await supabase
    .from("urls")
    .select("id,primary_url")
    .or(`short_url.eq.${id}, custom_url.eq.${id}`)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("Error while redirecting");
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
