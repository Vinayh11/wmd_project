import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState("");
  const { login, register } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    if (!email || !password) return setMessage("Please fill in all fields.");
    if (password.length < 6) return setMessage("Password must contain at least 6 characters.");

    try {
      if (registering) {
        await register(email, password);
        setMessage("Registration successful!");
      } else {
        await login(email, password);
        setMessage("Login successful!");
      }
    } catch (error) {
      const messages = {
        "auth/email-already-in-use": "This email is already registered.",
        "auth/invalid-credential": "Invalid email or password.",
        "auth/invalid-email": "Please enter a valid email.",
        "auth/weak-password": "Password must contain at least 6 characters."
      };
      setMessage(messages[error.code] || "Authentication failed. Please try again.");
    }
  }

  return (
    <section className="auth-card">
      <h2>{registering ? "Student Registration" : "Student Login"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
        <button type="submit">{registering ? "Register" : "Login"}</button>
      </form>
      <button className="secondary" onClick={() => { setRegistering(!registering); setMessage(""); }}>
        {registering ? "Already have an account? Login" : "New student? Register"}
      </button>
      {message && <p role="status">{message}</p>}
    </section>
  );
}
