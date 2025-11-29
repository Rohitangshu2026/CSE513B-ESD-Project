import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateHR, getHRbyId } from "../../api/hrApi";

const EditHRContainer: React.FC = () => {
  const { name, hrId } = useParams();
  const navigate = useNavigate();

  const [hr, setHr] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);

      const res: any = await getHRbyId(Number(hrId), name || "");

      if (!res) {
        navigate("/not-found");
        return;
      }

      if (res?.accessDenied === true) {
        navigate("/access-denied");
        return;
      }

      setHr({
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        contactNumber: res.contactNumber,
      });
    } catch {
      navigate("/not-found");
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [hrId]);

  const handleSubmit = async () => {
    if (!hr) return;

    if (!hr.firstName.trim()) {
      setError("First name is required");
      return;
    }

    setSaving(true);
    try {
      await updateHR(hrId!, hr);
      navigate(`/org/${name}/hr`);
    } catch (err: any) {
      setError(err?.message || "Unable to update HR");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.pageCenter}>
        <div style={styles.loadingText}>Loading HR details…</div>
      </div>
    );
  }

  if (!hr) return null;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Edit HR — {name}</h1>

        <div style={styles.form}>
          <input
            placeholder="First Name"
            style={styles.input}
            value={hr.firstName}
            onChange={(e) => setHr({ ...hr, firstName: e.target.value })}
          />

          <input
            placeholder="Last Name"
            style={styles.input}
            value={hr.lastName}
            onChange={(e) => setHr({ ...hr, lastName: e.target.value })}
          />

          <input
            placeholder="Email"
            style={styles.input}
            value={hr.email}
            onChange={(e) => setHr({ ...hr, email: e.target.value })}
          />

          <input
            placeholder="Phone Number"
            style={styles.input}
            value={hr.contactNumber}
            onChange={(e) =>
              setHr({ ...hr, contactNumber: e.target.value })
            }
          />
        </div>

        <button style={styles.saveBtn} onClick={handleSubmit}>
          {saving ? "Saving…" : "Update HR"}
        </button>

        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

/* ------------------------ STYLES ------------------------ */
const styles: Record<string, React.CSSProperties> = {
  page: {
    background: "#F4F4EE",
    minHeight: "100vh",
    paddingTop: 40,
    display: "flex",
    justifyContent: "center",
  },
  pageCenter: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 20,
  },
  loadingText: {
    color: "#777",
  },
  card: {
    background: "#F8F7F2",
    padding: "40px",
    width: "85%",
    maxWidth: "750px",
    borderRadius: "20px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
  },
  heading: {
    textAlign: "center",
    color: "#3A3A3A",
    fontSize: "27px",
    fontWeight: 600,
    marginBottom: 30,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "10px",
    border: "1px solid #D9C4B0",
    outline: "none",
    fontSize: "15px",
  },
  saveBtn: {
    width: "100%",
    marginTop: 20,
    padding: "12px 15px",
    background: "#BBDCE5",
    border: "none",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "16px",
    cursor: "pointer",
    color: "#003B47",
  },
  error: {
    color: "red",
    marginTop: 20,
    textAlign: "center",
  },
};

export default EditHRContainer;
