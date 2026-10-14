import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import TicketForm from "../components/TicketForm";

export default function AddTicket() {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  async function createTicket(form) {
    setError("");
    setSaving(true);

    try {
      await api.post("/tickets", form);

      navigate("/", {
        replace: true,
        state: { message: "Ticket created successfully." },
      });
    } catch (err) {
      const errors = err.response?.data?.errors;
      const firstError = errors ? Object.values(errors)[0]?.[0] : null;

      setError(
        firstError ||
          err.response?.data?.message ||
          "Unable to create the ticket. Check the API server.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="page">
      <Link to="/">← Back to Ticket List</Link>
      <h1>Add Ticket</h1>

      <TicketForm
        onSubmit={createTicket}
        submitLabel="Create Ticket"
        error={error}
        saving={saving}
      />
    </main>
  );
}
