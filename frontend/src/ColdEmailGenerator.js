import React, { useState } from 'react';
import axios from 'axios';

function ColdEmailPage() {
  const [jobUrl, setJobUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!jobUrl.trim()) {
      setError('Please enter a job URL.');
      return;
    }

    setLoading(true);
    setError('');
    setEmail('');
    setSkills([]);

    const response = await axios.post('https://cold-email-x55y.onrender.com/api/generate', {
  jobUrl,
});


      setEmail(response.data.generatedEmail || response.data.email || '');
      setSkills(response.data.skills || []);
    } catch (err) {
      console.error('❌ Axios Error:', err.response?.data || err.message);
      setError('Failed to generate email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚀 Cold Email Generator (via Job URL)</h1>

      <input
        type="text"
        placeholder="Paste job post URL here..."
        value={jobUrl}
        onChange={(e) => setJobUrl(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSubmit} disabled={loading} style={styles.button}>
        {loading ? 'Generating...' : 'Generate Cold Email'}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {email && (
        <div style={styles.outputBox}>
          <h3>📧 Generated Cold Email:</h3>
          <pre style={styles.text}>{email}</pre>
        </div>
      )}

      {skills.length > 0 && (
        <div style={styles.outputBox}>
          <h3>🧠 Required Skills:</h3>
          <ul>
            {skills.map((skill, idx) => (
              <li key={idx}>• {skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '25px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '26px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    marginBottom: '20px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  outputBox: {
    marginTop: '25px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
    border: '1px solid #ddd',
  },
  text: {
    whiteSpace: 'pre-wrap',
    color: 'blue',
    fontSize: '15px',
  },
};

export default ColdEmailPage;
