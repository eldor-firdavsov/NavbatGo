function BarberCard({ barber, onView }) {
  const estimatedMinutes = barber.queueCount * 20;

  return (
    <article className="rounded-xl border border-border bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {barber.imageUrl ? (
            <img
              src={barber.imageUrl}
              alt={barber.name}
              className="h-14 w-14 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-lg font-semibold text-primary">
              {barber.name.slice(0, 1)}
            </div>
          )}

          <div>
            <h3 className="text-base font-semibold text-primary">{barber.name}</h3>
            <p className="text-sm text-primary/70">{barber.isOpen ? "Open" : "Closed"}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-1 text-sm text-primary/80">
        <p>{barber.queueCount} people waiting</p>
        <p>Estimated time: ~{estimatedMinutes} min</p>
      </div>

      <button
        onClick={() => onView(barber.id)}
        className="mt-5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-primary shadow-sm transition hover:bg-secondary"
      >
        View
      </button>
    </article>
  );
}

export default function ClientDashboard({ user, barbers, onViewBarber, onLogout }) {
  return (
    <section className="w-full max-w-2xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-primary">Find Your Barber</h1>
          <p className="mt-1 text-sm text-primary/70">{user?.name ? `Hi, ${user.name}` : "Browse available barbers"}</p>
        </div>
        <button
          onClick={onLogout}
          className="rounded-xl border border-border px-3 py-2 text-sm text-primary transition hover:bg-secondary"
        >
          Log out
        </button>
      </div>

      <div className="space-y-4">
        {barbers.map((barber) => (
          <BarberCard key={barber.id} barber={barber} onView={onViewBarber} />
        ))}
      </div>
    </section>
  );
}
