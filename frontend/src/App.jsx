import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import MentorLogin from "./components/MentorLogin";
import MentorDashboard from "./components/MentorDashboard";
import MentorList from "./components/MentorList";
import Navbar from "./components/Navbar";

export default function App() {
  const { user, loading, logout } = useAuth();
  const [loginType, setLoginType] = useState("student");
  const [page, setPage] = useState("home");

  if (loading) return <main className="container"><h2>Loading MentorConnect...</h2></main>;

  if (!user) return <main className="landing">
    <header className="brand">MC <span>MentorConnect</span></header>
    <section className="intro"><p>LEARN · GROW · SUCCEED</p><h1>Peer-to-Peer Mentorship.</h1>
      <p>Connect with senior students for academic, technical, and career guidance.</p></section>
    <section className="login-area">
      <div className="tabs">
        <button className={loginType === "student" ? "" : "secondary"} onClick={() => setLoginType("student")}>Student Login</button>
        <button className={loginType === "mentor" ? "" : "secondary"} onClick={() => setLoginType("mentor")}>Mentor Login</button>
      </div>
      {loginType === "student" ? <LoginForm /> : <MentorLogin />}
    </section>
  </main>;

  const isMentor = user.email?.toLowerCase() === "mentor1@mentorconnect.com";
  if (isMentor) return <MentorDashboard />;

  return <div>
    <Navbar page={page} onNavigate={setPage} onLogout={logout} />
    <main className="container">
      {page === "home" && <section className="hero"><p>YOUR LEARNING JOURNEY</p><h1>Welcome to MentorConnect</h1>
        <p>Learn from experienced students, build your skills, and take the next step toward your goals.</p>
        <button onClick={() => setPage("mentors")}>Explore Mentors →</button>
      </section>}
      {page === "mentors" && <MentorList view="mentors" />}
      {page === "requests" && <MentorList view="requests" />}
    </main>
  </div>;
}
