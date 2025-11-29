import React from "react";
import type { OrganisationCreateDTO } from "../../models/model";

interface Props {
  form: OrganisationCreateDTO;
  setForm: (f: OrganisationCreateDTO) => void;
  onSubmit: () => void;
  submitText: string;
}

const OrgForm: React.FC<Props> = ({ form, setForm, onSubmit, submitText }) => {
  const update = (field: keyof OrganisationCreateDTO, value: any) => {
    setForm({ ...form, [field]: value });
  };

  // const hr = form.hrContacts[0];

  return (
    <form
      style={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {/* Org Details */}
      <h3 style={styles.sectionTitle}>Organisation Details</h3>
      <div style={styles.row}>
        <input
          style={styles.input}
          placeholder="Organisation Name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </div>

      {/* Address */}
      <h3 style={styles.sectionTitle}>Address</h3>
      <div style={styles.row}>
        <input
          style={styles.input}
          placeholder="Address"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
        />
        
      </div>

      <button type="submit" style={styles.submitBtn}>
        {submitText}
      </button>
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  sectionTitle: {
    margin: "10px 0 5px",
    color: "#4F4F4F",
    fontSize: "18px",
  },
  row: {
    display: "flex",
    gap: "16px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #D9C4B0",
    background: "#fff",
  },
  textarea: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #D9C4B0",
    background: "#fff",
    minHeight: "90px",
  },
  submitBtn: {
    marginTop: "10px",
    padding: "14px 18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#CFAB8D",
    fontWeight: 600,
    color: "#3A3A3A",
  },
};

export default OrgForm;
