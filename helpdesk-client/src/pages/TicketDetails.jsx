import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchTicket() {
      try {
        const response = await api.get(`/tickets/${id}`);
        setTicket(response.data);
      } catch {
        setError("Unable to load this ticket.");
      }
    }

    fetchTicket();
  }, [id]);

  async function deleteTicket() {
    setDeleting(true);
    setError("");

    try {
      await api.delete(`/tickets/${id}`);

      navigate("/", {
        replace: true,
        state: { message: "Ticket deleted successfully." },
      });
    } catch {
      setError("Unable to delete the ticket.");
      setDeleting(false);
      setConfirmDelete(false);
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
      <Link to="/">← Back to Ticket List</Link>
      <h1>Ticket Details</h1>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <section className="card details">
        <p>
          <strong>Ticket Number:</strong> {ticket.ticket_number}
        </p>
        <p>
          <strong>Requester:</strong> {ticket.requester_name}
        </p>
        <p>
          <strong>Email:</strong> {ticket.requester_email}
        </p>
        <p>
          <strong>Category:</strong> {ticket.issue_category}
        </p>
        <p>
          <strong>Priority:</strong> {ticket.priority}
        </p>
        <p>
          <strong>Subject:</strong> {ticket.subject}
        </p>
        <p>
          <strong>Description:</strong>
        </p>
        <p className="description">{ticket.description}</p>
        <p>
          <strong>Status:</strong> {ticket.status}
        </p>
        <p>
          <strong>Date Created:</strong>{" "}
          {new Date(ticket.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Last Updated:</strong>{" "}
          {new Date(ticket.updated_at).toLocaleString()}
        </p>

        <div className="actions">
          <Link className="button-link" to={`/tickets/${ticket.id}/edit`}>
            Edit Ticket
          </Link>

          <button
            type="button"
            className="danger"
            onClick={() => setConfirmDelete(true)}
          >
            Delete Ticket
          </button>
        </div>

        {confirmDelete && (
          <div className="confirm-inline">
            <p>Are you sure you want to delete this ticket?</p>
            <button
              type="button"
              className="danger"
              onClick={deleteTicket}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Confirm Delete"}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => setConfirmDelete(false)}
              disabled={deleting}
            >
              Cancel
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
