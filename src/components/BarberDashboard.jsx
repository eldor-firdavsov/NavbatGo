export default function BarberDashboard({ user, state, onChangeState, onLogout }) {
  const handleStatusToggle = () => {
    onChangeState((previous) => ({
      ...previous,
      isOpen: !previous.isOpen,
    }));
  };

  const handleNextClient = () => {
    onChangeState((previous) => {
      if (previous.queueCount === 0) return previous;
      return {
        ...previous,
        queueCount: previous.queueCount - 1,
        currentTicket: previous.currentTicket + 1,
      };
    });
  };

  return (
    <section className="w-full max-w-lg rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-primary">Barber Dashboard</h1>
          <p className="mt-1 text-sm text-primary/70">{user?.name ? user.name : "Manage your queue"}</p>
        </div>
        <button
          onClick={onLogout}
          className="rounded-xl border border-border px-3 py-2 text-sm text-primary transition hover:bg-secondary"
        >
          Log out
        </button>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-secondary p-4">
          <p className="text-xs uppercase tracking-wide text-primary/60">Status</p>
          <button
            onClick={handleStatusToggle}
            className="mt-3 w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-primary shadow-sm"
          >
            {state.isOpen ? "Open" : "Closed"}
          </button>
        </div>

        <div className="rounded-xl border border-border bg-secondary p-4">
          <p className="text-sm text-primary/70">Queue count</p>
          <p className="mt-1 text-3xl font-semibold text-primary">{state.queueCount}</p>
          <p className="mt-3 text-sm text-primary/70">Current ticket: #{state.currentTicket}</p>
        </div>

        <button
          onClick={handleNextClient}
          disabled={!state.isOpen || state.queueCount === 0}
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          NEXT CLIENT
        </button>
      </div>
    </section>
  );
}
