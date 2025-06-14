import React, { useState } from "react";
import "./App_temp.css";

function App() {
  const [jobUrl, setJobUrl] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!jobUrl.trim()) {
      setError("❗ Please enter a job URL.");
      return;
    }

    setLoading(true);
    setError("");
    setEmail("");
    setSkills([]);

    try {
      const response = await fetch(
        "https://cold-email-x55y.onrender.com/api/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jobUrl }),
          credentials: "include", // <== important to match backend CORS config
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEmail(data.generatedEmail || data.email || "No email generated.");
        setSkills(Array.isArray(data.skills) ? data.skills : []);
      } else {
        setError(data.error || "❌ Failed to generate email. Please try again.");
        console.error("❌ Backend error:", data.error);
      }
    } catch (err) {
      console.error("❌ Server error:", err);
      setError("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="App"
      style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}
    >
      <h1>📩 Cold Email Generator</h1>

      <input
        type="text"
        value={jobUrl}
        onChange={(e) => setJobUrl(e.target.value)}
        placeholder="Enter Job URL"
        style={{
          padding: "10px",
          width: "350px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginRight: "10px",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleGenerate();
          }
        }}
        disabled={loading}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#94a3b8" : "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        {loading ? "Generating..." : "Generate Email"}
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {email && (
        <div style={{ marginTop: "2rem" }}>
          <h3>📧 Generated Email</h3>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "1rem",
              borderRadius: "6px",
              whiteSpace: "pre-wrap",
            }}
          >
            {email}
          </pre>
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h3>🛠️ Required Skills</h3>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>• {skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
