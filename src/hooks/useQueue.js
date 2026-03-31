import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { fetchQueueForBarber } from "../lib/bookings";

export function useQueue(barberId) {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!barberId) return undefined;
    let mounted = true;

    const fetchQueue = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchQueueForBarber(barberId);
        if (mounted) setQueue(data);
      } catch (err) {
        if (mounted) setError(err?.message || "Failed to load queue.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchQueue();

    const channel = supabase
      .channel(`queue-${barberId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
          filter: `barber_id=eq.${barberId}`,
        },
        () => fetchQueue()
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [barberId]);

  return { queue, loading, error };
}
