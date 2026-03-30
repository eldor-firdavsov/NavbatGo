import { useMemo, useState } from "react";

export default function BarberDetail({ barber, onBack }) {
  const [joined, setJoined] = useState(false);

  const queuePosition = useMemo(() => barber.queueCount + 9, [barber.queueCount]);
  const estimatedTime = useMemo(() => barber.queueCount * 20, [barber.queueCount]);

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
        <p>Queue count: {barber.queueCount}</p>
        <p>Estimated wait time: {estimatedTime} minutes</p>
      </div>

      {!joined ? (
        <button
          onClick={() => setJoined(true)}
          className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
        >
          JOIN QUEUE
        </button>
      ) : (
        <div className="mt-6 rounded-xl border border-border bg-white p-4 shadow-sm">
          <p className="text-base font-semibold text-primary">You're #{queuePosition} in line</p>
          <p className="mt-1 text-sm text-primary/70">Estimated time: {estimatedTime} minutes</p>
        </div>
      )}
    </section>
  );
}
