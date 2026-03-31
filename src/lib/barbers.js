import { supabase } from "./supabase";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=300&q=80";

function normalizeBarber(row, index) {
  return {
    id: row.id ?? index + 1,
    name: row.name ?? "Unknown Barber",
    imageUrl: row.image_url ?? "",
    workingHours: row.working_hours ?? "09:00 - 21:00",
    isOpen: typeof row.is_open === "boolean" ? row.is_open : true,
    queueCount: typeof row.queue_count === "number" ? row.queue_count : 0,
    imageFallback: FALLBACK_IMAGE,
  };
}

export async function fetchBarbers() {
  const { data, error } = await supabase
    .from("barbers")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(normalizeBarber);
}
