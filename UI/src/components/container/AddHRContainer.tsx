import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addHR } from "../../api/hrApi";

const AddHRContainer: React.FC = () => {
  const { name } = useParams();                // Organisation name from URL
  const navigate = useNavigate();

  const [hr, setHr] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const updateField = (key: string, value: string) => {
    setHr((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setError(null);

    if (!hr.firstName.trim()) return setError("First name is required");

    try {
      setSaving(true);
      await addHR(name!, hr);
      navigate(`/org/${name}/hr`);
    } catch (err: any) {
      setError("Failed to add HR");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Add HR for {name}</h1>

        <div style={styles.form}>
          <input
            placeholder="First Name"
            style={styles.input}
            value={hr.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
          />

          <input
            placeholder="Last Name"
            style={styles.input}
            value={hr.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
          />

          <input
            placeholder="Email"
            style={styles.input}
            value={hr.email}
            onChange={(e) => updateField("email", e.target.value)}
          />

          <input
            placeholder="Phone Number"
            style={styles.input}
            value={hr.contactNumber}
            onChange={(e) => updateField("contactNumber", e.target.value)}
          />

          <button style={styles.button} onClick={handleSubmit} disabled={saving}>
            {saving ? "Adding..." : "Add HR"}
          </button>

          {error && <div style={styles.error}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default AddHRContainer;

// -------------------------------------------------------
//               STYLES (PASTEL THEME)
// -------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: "#F4F4EE",
    minHeight: "100vh",
    paddingTop: 40,
    display: "flex",
    justifyContent: "center",
  },

  card: {
    background: "#F8F7F2",
    padding: 40,
    width: "80%",
    maxWidth: 600,
    borderRadius: 20,
    boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
  },

  heading: {
    textAlign: "center",
    fontSize: 26,
    marginBottom: 25,
    color: "#3A3A3A",
    fontWeight: 600,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },

  input: {
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #D9C4B0",
    background: "#FFFFFF",
    fontSize: 16,
    outline: "none",
  },

  button: {
    padding: "14px",
    borderRadius: 10,
    background: "#CFAB8D",
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 600,
    color: "#3A3A3A",
  },

  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
};
