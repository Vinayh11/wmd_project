import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function MentorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await login(email, password);
    } catch {
      setMessage("Mentor login failed. Check your credentials.");
    }
  }

  return (
    <section className="auth-card">
      <h2>Mentor Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Mentor Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter mentor email" required />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required />
        <button type="submit">Login as Mentor</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
}
