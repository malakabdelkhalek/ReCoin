import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ phone: user.phone, address: user.address });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    try {
      const { data } = await api.patch("/users/profile/", form);
      // Update stored user so Navbar reflects changes
      localStorage.setItem("user", JSON.stringify({ ...user, ...data }));
      setSaved(true);
    } catch {
      setError("Failed to update profile.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>My Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Status:</strong> {user.is_approved ? "✅ Approved" : "⏳ Pending approval"}</p>

      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="phone" placeholder="Phone" value={form.phone}
          onChange={handleChange} style={styles.input} />
        <input name="address" placeholder="Address" value={form.address}
          onChange={handleChange} style={styles.input} />
        {saved && <p style={styles.success}>Profile updated.</p>}
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Save changes</button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: "40px auto", padding: "0 16px" },
  form: { display: "flex", flexDirection: "column", gap: 12, marginTop: 12 },
  input: { padding: "10px", fontSize: "1rem", borderRadius: 4, border: "1px solid #ccc" },
  button: { padding: "10px", backgroundColor: "#2e7d32", color: "white", border: "none", borderRadius: 4, cursor: "pointer", fontSize: "1rem" },
  error: { color: "red" },
  success: { color: "green" },
};
