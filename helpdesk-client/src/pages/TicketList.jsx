import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await api.get("/tickets");
        setTickets(response.data);
      } catch {
        setError("Cannot load tickets. Check the Laravel API.");
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  function logout() {
    localStorage.removeItem("helpdeskLoggedIn");
    navigate("/login", { replace: true });
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <h1>Helpdesk Ticket List</h1>
          <p>Manage IT support requests.</p>
        </div>

        <button type="button" className="secondary" onClick={logout}>
          Logout
        </button>
      </header>

      {location.state?.message && (
        <p className="success" role="status">
          {location.state.message}
        </p>
      )}

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p>Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <section className="card">
          <p>No tickets have been created yet.</p>
          <Link to="/tickets/new">Create your first ticket</Link>
        </section>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Ticket No.</th>
                <th>Requester</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.ticket_number}</td>
                  <td>{ticket.requester_name}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.status}</td>
                  <td>{new Date(ticket.created_at).toLocaleString()}</td>
                  <td>
                    <Link to={`/tickets/${ticket.id}`}>View</Link>
                    {" | "}
                    <Link to={`/tickets/${ticket.id}/edit`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link
        to="/tickets/new"
        className="floating-button"
        aria-label="Add Ticket"
        title="Add Ticket"
      >
        +
      </Link>
    </main>
  );
}
