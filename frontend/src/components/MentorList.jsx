import { useEffect, useState } from "react";
import {
  addDoc, collection, deleteDoc, doc, getDocs, query,
  where, serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase";

const mentors = [
  { id: 1, name: "Rahul Sharma", year: "Final Year", department: "Computer Engineering", skills: "Java, React, Web Development", interest: "Web Development" },
  { id: 2, name: "Priya Patil", year: "Third Year", department: "AI & ML", skills: "Python, Machine Learning, Data Science", interest: "Artificial Intelligence" },
  { id: 3, name: "Aditya Kulkarni", year: "Final Year", department: "Computer Engineering", skills: "Java, SQL, Backend Development", interest: "Software Development" },
  { id: 4, name: "Sneha Deshmukh", year: "Third Year", department: "Information Technology", skills: "UI/UX, HTML, CSS, JavaScript", interest: "Frontend Development" }
];

export default function MentorList({ view = "mentors" }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isRequestsPage = view === "requests";

  async function loadRequests() {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      const q = query(collection(db, "mentorshipRequests"), where("studentEmail", "==", auth.currentUser.email));
      const snapshot = await getDocs(q);
      setRequests(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setError("");
    } catch {
      setError("Unable to load requests. Check Firestore rules and configuration.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadRequests(); }, []);

  async function handleConnect(mentor) {
    try {
      const existing = requests.find(r => r.mentorId === mentor.id);
      if (existing) return;
      const newRequest = {
        studentEmail: auth.currentUser.email,
        mentorId: mentor.id,
        mentorName: mentor.name,
        mentorYear: mentor.year,
        mentorDepartment: mentor.department,
        mentorSkills: mentor.skills,
        mentorInterest: mentor.interest,
        status: "Pending",
        createdAt: serverTimestamp()
      };
      const ref = await addDoc(collection(db, "mentorshipRequests"), newRequest);
      setRequests(old => [...old, { id: ref.id, ...newRequest }]);
    } catch {
      setError("Could not send request. Please try again.");
    }
  }

  async function handleCancel(request) {
    if (!window.confirm("Cancel this mentorship request?")) return;
    await deleteDoc(doc(db, "mentorshipRequests", request.id));
    setRequests(old => old.filter(r => r.id !== request.id));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;

  if (isRequestsPage) {
    return <section><h2>My Mentorship Requests</h2>
      {requests.length === 0 ? <p>You have not sent any requests yet.</p> : requests.map(r =>
        <article className="card" key={r.id}>
          <h3>{r.mentorName}</h3>
          <p>{r.mentorYear} · {r.mentorDepartment}</p>
          <p>Status: <strong>{r.status}</strong></p>
          <p>Skills: {r.mentorSkills}</p>
          {r.status === "Pending" && <button className="danger" onClick={() => handleCancel(r)}>Cancel request</button>}
        </article>
      )}
    </section>;
  }

  return <section><h2>Find a Mentor</h2><div className="grid">
    {mentors.map(m => {
      const requested = requests.find(r => r.mentorId === m.id);
      return <article className="card" key={m.id}>
        <h3>{m.name}</h3><p>{m.year} · {m.department}</p>
        <p><b>Skills:</b> {m.skills}</p><p><b>Area of interest:</b> {m.interest}</p>
        {requested ? <p>Request sent · {requested.status}</p> :
          <button onClick={() => handleConnect(m)}>Request Mentorship</button>}
      </article>;
    })}
  </div></section>;
}
