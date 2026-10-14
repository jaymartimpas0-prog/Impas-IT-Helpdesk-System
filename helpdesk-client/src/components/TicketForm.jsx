import { useState } from "react";

const emptyTicket = {
  requester_name: "",
  requester_email: "",
  issue_category: "Hardware",
  priority: "Medium",
  subject: "",
  description: "",
  status: "Open",
};

export default function TicketForm({
  ticket,
  onSubmit,
  submitLabel,
  error,
  saving,
  showStatus = false,
}) {
  const [form, setForm] = useState(() => ({
    ...emptyTicket,
    ...(ticket || {}),
  }));

  function updateField(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <form className="card ticket-form" onSubmit={handleSubmit}>
      <label htmlFor="requester_name">Requester Name</label>
      <input
        id="requester_name"
        name="requester_name"
        value={form.requester_name}
        onChange={updateField}
        required
      />

      <label htmlFor="requester_email">Requester Email</label>
      <input
        id="requester_email"
        name="requester_email"
        type="email"
        value={form.requester_email}
        onChange={updateField}
        required
      />

      <label htmlFor="issue_category">Issue Category</label>
      <select
        id="issue_category"
        name="issue_category"
        value={form.issue_category}
        onChange={updateField}
        required
      >
        <option>Hardware</option>
        <option>Software</option>
        <option>Network</option>
        <option>Account Access</option>
        <option>Other</option>
      </select>

      <label htmlFor="priority">Priority</label>
      <select
        id="priority"
        name="priority"
        value={form.priority}
        onChange={updateField}
        required
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>

      <label htmlFor="subject">Subject</label>
      <input
        id="subject"
        name="subject"
        value={form.subject}
        onChange={updateField}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={updateField}
        rows="5"
        required
      />

      {showStatus && (
        <>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={updateField}
            required
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        </>
      )}

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
