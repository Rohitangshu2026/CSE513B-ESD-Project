import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getHRList, deleteHR, searchHR } from "../../api/hrApi";
import type { OrganisationHRCreateDTO } from "../../models/model";

const OrgHRListContainer: React.FC = () => {
  const { name } = useParams();
  const [list, setList] = useState<OrganisationHRCreateDTO[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res: any = await getHRList(name!);
      setList(res);
    } catch (err: any) {
      setError(err?.message || "Unable to load HR list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [name]);

  const doSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!query.trim()) {
        await load();
        return;
      }

      const res: any = await searchHR(name!, query);
      setList(res);
    } catch (err: any) {
      setError(err?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: number) => {
    const ok = confirm("Delete this HR?");
    if (!ok) return;

    setLoading(true);
    try {
      await deleteHR(id);
      await load();
    } catch (err: any) {
      setError(err?.message || "Delete failed");
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>HR Details — {name}</h1>

        {/* Search Bar */}
        <form onSubmit={doSearch} style={styles.topBar}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search HR..."
            style={styles.search}
          />
          <button type="submit" style={styles.searchBtn}>
            Search
          </button>
          <Link to={`/org/${name}/hr/add`} style={styles.addBtn}>
            + Add HR
          </Link>
        </form>

        {loading && <div style={styles.info}>Loading...</div>}
        {error && <div style={styles.error}>{error}</div>}

        <ul style={styles.list}>
          {list.map((hr: any) => (
            <li key={hr.id} style={styles.listItem}>
              <div>
                <div style={styles.hrName}>{hr.firstName} {hr.lastName}</div>
                <div style={styles.hrEmail}>{hr.email}</div>
                <div style={styles.hrEmail}>{hr.contactNumber}</div>
              </div>

              <div style={styles.actions}>
                <Link
                  to={`/org/${name}/hr/edit/${hr.id}`}
                  style={styles.editBtn}
                >
                  Edit
                </Link>

                <button
                  onClick={() => remove(hr.id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {!loading && list.length === 0 && (
          <div style={styles.empty}>No HR records found.</div>
        )}
      </div>
    </div>
  );
};

/* -------- STYLES (same structure as Organisations page) -------- */

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
  topBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
  },
  search: {
    flex: 1,
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #D9C4B0",
    background: "#FFFFFF",
    fontSize: "16px",
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
  addBtn: {
    background: "#BBC863",
    color: "black",
    padding: "14px 18px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 600,
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    background: "#FFFFFF",
    padding: "16px 28px",
    borderRadius: "12px",
    border: "1px solid #E4D5C8",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  hrName: {
    fontWeight: 600,
    fontSize: "16px",
    color: "#333",
    padding:"5px"
  },
  hrEmail: {
    color: "#777",
    padding:"5px"

  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  editBtn: {
    padding: "6px 12px",
    background: "#BBDCE5",
    borderRadius: "8px",
    color: "#003B47",
    textDecoration: "none",
    fontWeight: 600,
  },
  deleteBtn: {
    padding: "6px 12px",
    background: "#E57373",
    borderRadius: "8px",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },
  info: {
    textAlign: "center",
    color: "#777",
    marginBottom: 15,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
};

export default OrgHRListContainer;
