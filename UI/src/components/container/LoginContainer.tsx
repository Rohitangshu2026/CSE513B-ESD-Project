import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/orgApi";

const LoginContainer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const doLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const res: any = await login(email, password);
      const token = res?.token || res?.data?.token || "dummy-token";
      localStorage.setItem("token", token);
      navigate("/org/list");
    } catch (err: any) {
      setError("Cannot connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* SHAKE ANIMATION */}
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

    /* REMOVE BLUE HIGHLIGHT */
    input:focus {
      outline: none;
      box-shadow: none;
    }
          }
        `}
      </style>

      <div style={styles.card} className={error ? "shake" : ""}>
        <h1 style={styles.title}>Outreach Login</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            doLogin();
          }}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FIXED HEIGHT ERROR SLOT */}
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
  background: "#F4F4EE",   // lighter + cleaner + modern
  padding: "45px",
  borderRadius: "18px",
  width: "100%",
  maxWidth: "420px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
},


  title: {
    margin: 0,
    textAlign: "center",
    color: "#2B2B2B",
    fontSize: "32px",
    fontWeight: 700,
  },

  label: {
    fontSize: "14px",
    color: "#3A3A3A",
    fontWeight: 500,
  },

  input: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #D9C4B0",
    background: "#FFF",
    fontSize: "16px",
    color: "#2B2B2B",
  },

  button: {
    padding: "14px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#D9C4B0",  // ✔ LIGHTER BUTTON COLOR
    color: "#2B2B2B",
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.25s",
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
