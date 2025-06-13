// src/App.js
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
      setError("Please enter a job URL.");
      return;
    }

    setLoading(true);
    setError("");
    setEmail("");
    setSkills([]);

    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmail(data.generatedEmail);
        setSkills(data.skills);
      } else {
        setError(data.error || "Failed to generate email. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "Arial" }}>
   <h1>📩 Cold Email Generator</h1>


      <input
        type="text"
        value={jobUrl}
        onChange={(e) => setJobUrl(e.target.value)}
        placeholder="Enter Job URL"
        style={{ padding: "8px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Email"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {email && (
        <div style={{ marginTop: "2rem" }}>
          <h3>📧 Generated Email</h3>
          <pre style={{ background: "#f4f4f4", padding: "1rem" }}>{email}</pre>
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h3>🛠️ Required Skills</h3>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
