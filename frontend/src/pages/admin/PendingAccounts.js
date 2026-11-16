import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PendingAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/users/admin/pending/")
      .then((r) => setAccounts(r.data))
      .finally(() => setLoading(false));
  }, []);

  const approve = async (userId) => {
    await api.post(`/users/admin/approve/${userId}/`);
    // Remove from the list after approval
    setAccounts(accounts.filter((a) => a.id !== userId));
  };

  if (loading) return <p style={styles.msg}>Loading…</p>;

  return (
    <div style={styles.container}>
      <h2>Pending Account Approvals</h2>
      {accounts.length === 0 ? (
        <p>No accounts waiting for approval.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Username</th><th>Email</th><th>Role</th><th>Joined</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.id}>
                <td>{a.username}</td>
                <td>{a.email}</td>
                <td>{a.role}</td>
                <td>{new Date(a.date_joined).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => approve(a.id)} style={styles.approveBtn}>
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: 800, margin: "40px auto", padding: "0 16px" },
  table: { width: "100%", borderCollapse: "collapse" },
  approveBtn: { backgroundColor: "#2e7d32", color: "white", border: "none", padding: "6px 12px", borderRadius: 4, cursor: "pointer" },
  msg: { textAlign: "center", marginTop: 40 },
};
