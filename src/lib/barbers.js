import { createClient } from "./client";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=300&q=80";

function toBooleanStatus(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "open";
  return true;
}

function toNumber(value, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function mapBarberRow(row, index) {
  return {
    id: row.id ?? index + 1,
    name: row.name ?? row.full_name ?? `Barber ${index + 1}`,
    imageUrl: row.image_url ?? row.imageUrl ?? FALLBACK_IMAGE,
    workingHours: row.working_hours ?? row.workingHours ?? "09:00 - 21:00",
    isOpen: toBooleanStatus(row.is_open ?? row.isOpen ?? row.status),
    queueCount: toNumber(row.queue_count ?? row.queueCount ?? row.queue, 0),
  };
}

export async function fetchBarbers() {
  const supabase = createClient();
  const tableName = import.meta.env.VITE_SUPABASE_BARBERS_TABLE || "barbers";

  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;

  return (data ?? []).map(mapBarberRow);
}
