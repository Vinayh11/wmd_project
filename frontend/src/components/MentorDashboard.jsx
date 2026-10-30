import { useEffect, useState } from "react";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function MentorDashboard() {
  const { logout } = useAuth();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      const q = query(collection(db, "mentorshipRequests"), where("mentorId", "==", 1));
      const snap = await getDocs(q);
      setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch {
      setError("Unable to load mentor requests. Check Firestore rules.");
    }
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(request, status) {
    try {
      await updateDoc(doc(db, "mentorshipRequests", request.id), { status });
      setRequests(old => old.map(r => r.id === request.id ? { ...r, status } : r));
    } catch {
      setError("Could not update status. Check mentor account and Firestore rules.");
    }
  }

  return <main className="container">
    <h1>Mentor Dashboard</h1>
    <p>Welcome, Rahul Sharma!</p>
    {error && <p role="alert">{error}</p>}
    {requests.length === 0 ? <p>No incoming requests.</p> : requests.map(r =>
      <article className="card" key={r.id}>
        <h3>{r.mentorName}</h3>
        <p><b>Student:</b> {r.studentEmail}</p>
        <p><b>Status:</b> {r.status}</p>
        {r.status === "Pending" && <>
          <button onClick={() => updateStatus(r, "Accepted")}>Accept</button>
          <button className="danger" onClick={() => updateStatus(r, "Rejected")}>Reject</button>
        </>}
      </article>
    )}
    <button className="secondary" onClick={logout}>Log out</button>
  </main>;
}
