import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { OrganisationCreateDTO } from "../../models/model";
import OrgForm from "../presentation/OrgForm";
import { createOrganisation } from "../../api/orgApi";

const initialForm = (): OrganisationCreateDTO => ({
  name: "",
  address: "",
});

const RegisterOrgContainer: React.FC = () => {
  const [form, setForm] = useState<OrganisationCreateDTO>(initialForm());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validate = (f: OrganisationCreateDTO) => {
    if (!f.name?.trim()) return "Organisation name is required";
    //const hr = f.hrContacts?.[0];
    // if (!hr || !hr.firstName?.trim()) return "HR first name is required";
    // if (hr.email && !/^\S+@\S+\.\S+$/.test(hr.email)) return "Invalid HR email";
    return null;
  };

  const handleSubmit = async () => {
    setError(null);
    const v = validate(form);
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const res: any = await createOrganisation(form);
      const orgName = res?.name || form.name;   // backend may or may not return name
      navigate(`/org/${orgName}/hr/`);
    } catch (err: any) {
      setError(err?.message || "Error creating organisation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Register Organisation</h1>

        <OrgForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          submitText="Register"
        />

        {loading && <div style={styles.infoText}>Saving...</div>}
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: "#F4F4EE",
    minHeight: "100vh",
    width: "100%",
    paddingTop: 40,
    display: "flex",
    justifyContent: "center",
    overflowX: "hidden",
  },

  card: {
    background: "#F8F7F2",
    padding: "40px",
    width: "80%",
    maxWidth: "850px",
    borderRadius: "20px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
  },

  heading: {
    textAlign: "center",
    color: "#3A3A3A",
    marginBottom: "28px",
    fontSize: "28px",
    fontWeight: 600,
  },

  error: {
    color: "red",
    marginTop: "20px",
    textAlign: "center",
  },

  infoText: {
    color: "#777",
    textAlign: "center",
    marginTop: "15px",
  },
};

export default RegisterOrgContainer;
