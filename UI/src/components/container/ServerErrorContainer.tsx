import React from "react";

const ServerErrorPage: React.FC = () => {
  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h1 style={styles.title}>Page not found</h1>
        {/* <button style={styles.button} onClick={() => window.location.reload()}>
          Retry
        </button> */}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    background: "#f6f7fb",
    fontFamily: "sans-serif",
    textAlign: "center",
    paddingTop: "120px",
    minHeight: "100vh",
  },
  box: {
    display: "inline-block",
    padding: "30px 50px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    background: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "20px",
    marginBottom: "30px",
  },
  button: {
    fontSize: "16px",
    padding: "10px 20px",
    cursor: "pointer",
    color: "#fff",
    background: "#007bff",
    border: "none",
    borderRadius: "6px",
  },
};

export default ServerErrorPage;