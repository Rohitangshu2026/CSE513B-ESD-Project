import React, { useEffect, useState } from "react";
import type { OrganisationSearchResult } from "../../models/model";
import { getOrganisations, deleteOrganisation, searchOrganisation } from "../../api/orgApi";
import { Link, useNavigate } from "react-router-dom";

const OrgListContainer: React.FC = () => {
  const [list, setList] = useState<OrganisationSearchResult[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res: any = await getOrganisations();
      const items = Array.isArray(res) ? res : res?.items ?? [];
      setList(items);
    } catch (err: any) {
      setError(err?.message || "Unable to load organisations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const doSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res: any = await searchOrganisation(query);
      const items = Array.isArray(res) ? res : res?.items ?? [];
      setList(items);
    } catch (err: any) {
      setError(err?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (name: string) => {
    const ok = confirm("Delete this organisation?");
    if (!ok) return;
    setLoading(true);
    try {
      await deleteOrganisation(name);
      await load();
    } catch (err: any) {
      setError(err?.message || "Delete failed");
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Organisations</h1>

        <form onSubmit={doSearch} style={styles.searchRow}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search organizations..."
            style={styles.input}
          />
          <button type="submit" style={styles.searchBtn}>Search</button>
          <button type="button" onClick={() => navigate("/org/register")} style={styles.newBtn}>
            + Register New
          </button>
        </form>

        {loading && <div style={styles.infoText}>Loading...</div>}
        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.list}>
          {list.map((org) => (
            <div key={org.id} style={styles.item}>
              <span style={styles.orgName}>{org.name}</span>

              <div style={styles.actions}>
                <Link to={`/org/${org.name}/hr`} style={styles.hrBtn}>HR</Link>
                <Link to={`/org/edit/${org.name}`} style={styles.editBtn}>Edit</Link>
                <button onClick={() => remove(org.name)} style={styles.deleteBtn}>Delete</button>

              </div>
            </div>
          ))}
        </div>
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
    color: "#4F4F4F",
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: 600,
  },

  searchRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #D9C4B0",
    background: "#FFFFFF",
    fontSize: "16px",
    outline: "none",
    color: "#444",
  },

  searchBtn: {
    background: "#e4d9d0ff",
    color: "#4F4F4F",
    padding: "14px 18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 600,
  },

  newBtn: {
    background: "#BBC863",
    color: "#3A3A3A",
    padding: "6px 12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "16px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  item: {
    background: "#FFFFFF",
    padding: "16px 20px",
    borderRadius: "12px",
    border: "1px solid #E4D5C8",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orgName: {
    color: "#565656",
    fontSize: "16px",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  hrBtn: {
  padding: "6px 12px",
  background: "#D9C4B0",
  borderRadius: "8px",
  color: "#3A3A3A",
  textDecoration: "none",
  fontWeight: 600,
},

  editBtn: {
    padding: "6px 12px",
    background: "#BBDCE5",
    borderRadius: "8px",
    color: "#3A3A3A",
    textDecoration: "none",
    fontWeight: 600,
  },

  deleteBtn: {
    padding: "6px 12px",
    background: "#E57373",
    borderRadius: "8px",
    color: "#3A3A3A",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },

  error: {
    color: "red",
    marginBottom: "20px",
    textAlign: "center",
  },

  infoText: {
    color: "#777",
    marginBottom: "20px",
    textAlign: "center",
  },
};

export default OrgListContainer;
