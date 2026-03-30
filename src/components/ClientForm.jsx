import { useState } from "react";

function Input({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-primary">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-primary outline-none transition focus:border-primary"
      />
    </label>
  );
}

export default function ClientForm({ onBack, onContinue }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const canContinue = name.trim() && phoneNumber.trim();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canContinue) return;

    onContinue({
      name: name.trim(),
      phoneNumber: phoneNumber.trim(),
    });
  };

  return (
    <section className="w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 text-sm text-primary/70 transition hover:text-primary"
      >
        Back
      </button>
      <h1 className="text-3xl font-semibold tracking-tight text-primary">Client Details</h1>
      <p className="mt-2 text-sm text-primary/70">Enter your details to continue</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Input
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />
        <Input
          label="Phone Number"
          type="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          placeholder="+1 555 123 4567"
        />

        <button
          type="submit"
          disabled={!canContinue}
          className="mt-2 w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
        </button>
      </form>
    </section>
  );
}
