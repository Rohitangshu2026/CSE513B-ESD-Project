import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.nav}>
        <div style={styles.left}>
          <span style={styles.logo}>Outreach Portal</span>
        </div>

        <div style={styles.links}>
          <NavLink
            to="/org/list"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.active } : styles.link
            }
          >
            Organisations
          </NavLink>

          <NavLink
            to="/org/register"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.active } : styles.link
            }
          >
            Register
          </NavLink>
        </div>

        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "#ECEEDF", // pastel cream
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 28px",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  left: {
    display: "flex",
    alignItems: "center",
  },

  logo: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#4A4A4A",
  },

  links: {
    display: "flex",
    gap: "20px",
  },

  link: {
    textDecoration: "none",
    fontSize: "16px",
    color: "#6A6A6A",
    padding: "8px 14px",
    borderRadius: "8px",
    transition: "0.25s",
  },

  active: {
    background: "#BBDCE5", // soft pastel blue
    color: "#2F2F2F",
    fontWeight: 600,
  },

  logoutBtn: {
    background: "#CFAB8D",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
    color: "#2B2B2B",
    transition: "0.25s",
  },
};

export default Navbar;
