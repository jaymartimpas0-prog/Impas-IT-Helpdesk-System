import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import TicketForm from "../components/TicketForm";

export default function EditTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchTicket() {
      try {
        const response = await api.get(`/tickets/${id}`);
        setTicket(response.data);
      } catch {
        setError("Unable to load the ticket for editing.");
      }
    }

    fetchTicket();
  }, [id]);

  async function updateTicket(form) {
    setError("");
    setSaving(true);

    try {
      await api.put(`/tickets/${id}`, form);

      navigate(`/tickets/${id}`, {
        replace: true,
        state: { message: "Ticket updated successfully." },
      });
    } catch (err) {
      const errors = err.response?.data?.errors;
      const firstError = errors ? Object.values(errors)[0]?.[0] : null;

      setError(
        firstError ||
          err.response?.data?.message ||
          "Unable to update the ticket.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (error && !ticket) {
    return (
      <main className="page">
        <p className="error">{error}</p>
        <Link to="/">Back to Ticket List</Link>
      </main>
    );
  }

  if (!ticket) {
    return (
      <main className="page">
        <p>Loading ticket...</p>
      </main>
    );
  }

  return (
    <main className="page">
      <Link to={`/tickets/${id}`}>← Back to Ticket Details</Link>
      <h1>Edit Ticket {ticket.ticket_number}</h1>

      <TicketForm
        ticket={ticket}
        onSubmit={updateTicket}
        submitLabel="Save Changes"
        error={error}
        saving={saving}
        showStatus={true}
      />
    </main>
  );
}
