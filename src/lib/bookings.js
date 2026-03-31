import { supabase } from "./supabase";

export async function fetchQueueForBarber(barberId) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("barber_id", barberId)
    .eq("status", "waiting")
    .order("ticket_number", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function bookSpot({ barberId, userName }) {
  const { data, error } = await supabase
    .from("bookings")
    .insert({ barber_id: barberId, user_name: userName })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function callNextClient(barberId) {
  const { error } = await supabase.rpc("next_client", { barber: barberId });
  if (error) throw error;
}
