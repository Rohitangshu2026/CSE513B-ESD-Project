import React, { useState } from "react";
import { login } from "../../api/orgApi";

const LoginContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const doGoogleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      await login(); 
    } catch (err: any) {
      setError("Cannot connect to server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-8px); }
            80% { transform: translateX(8px); }
            100% { transform: translateX(0); }
          }
          .shake {
            animation: shake 0.4s ease;
          }
        `}
      </style>

      <div style={styles.card} className={error ? "shake" : ""}>
        <h1 style={styles.title}>Outreach Login</h1>

        {/* GOOGLE SIGN IN BUTTON */}
        <button
          onClick={doGoogleLogin}
          style={styles.buttonGoogle}
          disabled={loading}
        >
          {loading ? "Redirecting…" : "Sign in with Google"}
        </button>

        {/* ERROR AREA */}
        <div style={styles.errorSlot}>
          {error && <p style={styles.error}>{error}</p>}
        </div>

      </div>
    </div>
  );
};

/* ----------------- STYLES ----------------- */
const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FAFAF8",
  },

  card: {
    background: "#F4F4EE",
    padding: "45px",
    borderRadius: "18px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    alignItems: "center",
  },

  title: {
    margin: 0,
    textAlign: "center",
    color: "#776464ff",
    fontSize: "32px",
    fontWeight: 700,
  },

  buttonGoogle: {
    padding: "14px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#D9C4B0",
    color: "#716565ff",
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.25s",
    width: "100%",
  },

  errorSlot: {
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  error: {
    color: "red",
    fontSize: "14px",
    margin: 0,
    textAlign: "center",
  },
};

export default LoginContainer;
