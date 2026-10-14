import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (username === "itadmin" && password === "helpdesk123") {
      localStorage.setItem("helpdeskLoggedIn", "true");
      setError("");
      navigate("/", { replace: true });
    } else {
      setError("Invalid username or password.");
    }
  }

  return (
    <main className="auth-wrapper">
      <form className="card" onSubmit={handleSubmit}>
        <h1>IT Helpdesk</h1>
        <p>Sign in to manage support tickets.</p>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        <button type="submit">Login</button>
      </form>
    </main>
  );
}
