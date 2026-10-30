export default function Navbar({ page, onNavigate, onLogout }) {
  return <nav className="navbar">
    <strong>MentorConnect</strong>
    <div>
      <button className="secondary" onClick={() => onNavigate("home")}>Home</button>
      <button className="secondary" onClick={() => onNavigate("mentors")}>Find a Mentor</button>
      <button className="secondary" onClick={() => onNavigate("requests")}>My Requests</button>
      <button onClick={onLogout}>Log out</button>
    </div>
  </nav>;
}
