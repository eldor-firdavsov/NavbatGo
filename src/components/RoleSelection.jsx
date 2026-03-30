export default function RoleSelection({ onClientClick, onBarberClick }) {
  return (
    <section className="w-full max-w-md rounded-xl border border-border bg-white p-6 text-center shadow-sm sm:p-8">
      <h1 className="text-4xl font-semibold tracking-tight text-primary">Welcome to BarberQueue</h1>
      <p className="mt-3 text-sm text-primary/70">Choose how you want to continue</p>

      <div className="mt-10 space-y-3">
        <button
          onClick={onClientClick}
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
        >
          Continue as Client
        </button>
        <button
          onClick={onBarberClick}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-primary shadow-sm transition hover:bg-secondary"
        >
          Continue as Barber
        </button>
      </div>
    </section>
  );
}
