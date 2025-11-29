import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import type { OrganisationCreateDTO } from "../../models/model";
import { getOrganisation, updateOrganisation } from "../../api/orgApi";
import OrgForm from "../presentation/OrgForm";

const EditOrgContainer: React.FC = () => {
  const { name } = useParams();
  console.log(name);
  const navigate = useNavigate();

  const [form, setForm] = useState<OrganisationCreateDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setError(null);
      try {
        const org: any = await getOrganisation(name ? name : "");
        console.log(org);
        const dto: OrganisationCreateDTO = {
          name: org.name,
          address: org.address
        };
        setForm(dto);
      } catch (err: any) {
        setError(err?.message || "Could not load organisation");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [name]);

  const validate = (f: OrganisationCreateDTO) => {
    if (!f.name?.trim()) return "Organisation name is required";
    return null;
  };

  if (loading) {
    return <div style={styles.loadingPage}>Loading organisation…</div>;
  }

  if (!form) {
    return <div style={styles.errorMsg}>No organisation found</div>;
  }

  const handleSubmit = async () => {
    setError(null);
    const v = validate(form);
    if (v) {
      setError(v);
      return;
    }

    setSaving(true);
    try {
      await updateOrganisation(name ? name : "", form);
      navigate("/org/list");
    } catch (err: any) {
      setError(err?.message || "Unable to update organisation");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Edit Organisation</h1>

        <OrgForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          submitText="Update"
        />

        {saving && <div style={styles.infoText}>Saving...</div>}
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

  errorMsg: {
    color: "red",
    textAlign: "center",
    marginTop: "40px",
    fontSize: "18px",
  },

  loadingPage: {
    textAlign: "center",
    marginTop: "40px",
    fontSize: "18px",
    color: "#4F4F4F",
  },
};

export default EditOrgContainer;
