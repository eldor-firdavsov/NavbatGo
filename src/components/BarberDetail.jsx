import { useMemo, useState } from "react";
import { useQueue } from "../hooks/useQueue";
import { bookSpot } from "../lib/bookings";

export default function BarberDetail({ barber, user, onBack }) {
  const [joinedTicket, setJoinedTicket] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const { queue, loading } = useQueue(barber.id);

  const queueCount = queue.length;
  const estimatedTime = useMemo(() => queueCount * 20, [queueCount]);

  const handleJoinQueue = async () => {
    setIsBooking(true);
    setBookingError("");
    try {
      const created = await bookSpot({
        barberId: barber.id,
        userName: user?.name || "Guest",
      });
      setJoinedTicket(created.ticket_number);
    } catch (error) {
      setBookingError(error?.message || "Could not book your spot.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <section className="w-full max-w-lg rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 text-sm text-primary/70 transition hover:text-primary"
      >
        Back
      </button>

      <h1 className="text-3xl font-semibold tracking-tight text-primary">{barber.name}</h1>

      <div className="mt-6 space-y-3 rounded-xl border border-border bg-secondary p-4 text-sm text-primary/80">
        <p>Working hours: {barber.workingHours}</p>
        <p>Queue count: {loading ? "Loading..." : queueCount}</p>
        <p>Estimated wait time: {estimatedTime} minutes</p>
      </div>

      {!joinedTicket ? (
        <button
          onClick={handleJoinQueue}
          disabled={isBooking}
          className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isBooking ? "BOOKING..." : "JOIN QUEUE"}
        </button>
      ) : (
        <div className="mt-6 rounded-xl border border-border bg-white p-4 shadow-sm">
          <p className="text-base font-semibold text-primary">You're #{joinedTicket} in line</p>
          <p className="mt-1 text-sm text-primary/70">Estimated time: {estimatedTime} minutes</p>
        </div>
      )}

      {bookingError && <p className="mt-3 text-sm text-primary/70">{bookingError}</p>}
    </section>
  );
}
