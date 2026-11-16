import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";

const ROLES = ["citizen", "business", "collector", "factory"];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "", email: "", password: "", role: "citizen", phone: "", address: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post("/users/register/", form);
      navigate("/login", {
        state: { message: "Account created. Please log in." },
      });
    } catch (err) {
      setError(err.response?.data || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create your ReCoin account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="username" placeholder="Username" value={form.username}
          onChange={handleChange} required style={styles.input} />
        <input name="email" type="email" placeholder="Email" value={form.email}
          onChange={handleChange} required style={styles.input} />
        <input name="password" type="password" placeholder="Password" value={form.password}
          onChange={handleChange} required style={styles.input} />
        <select name="role" value={form.role} onChange={handleChange} style={styles.input}>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
          ))}
        </select>
        <input name="phone" placeholder="Phone (optional)" value={form.phone}
          onChange={handleChange} style={styles.input} />
        <input name="address" placeholder="Address (optional)" value={form.address}
          onChange={handleChange} style={styles.input} />

        {/* Non-citizen accounts need admin approval — let the user know */}
        {form.role !== "citizen" && (
          <p style={styles.notice}>
            ℹ️ {form.role.charAt(0).toUpperCase() + form.role.slice(1)} accounts require admin approval before you can log in.
          </p>
        )}

        {error && <p style={styles.error}>{JSON.stringify(error)}</p>}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Creating account…" : "Register"}
        </button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}

const styles = {
  container: { maxWidth: 420, margin: "60px auto", padding: "0 16px" },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: { padding: "10px", fontSize: "1rem", borderRadius: 4, border: "1px solid #ccc" },
  button: { padding: "10px", backgroundColor: "#2e7d32", color: "white", border: "none", borderRadius: 4, cursor: "pointer", fontSize: "1rem" },
  error: { color: "red", fontSize: "0.9rem" },
  notice: { color: "#555", fontSize: "0.85rem", backgroundColor: "#f5f5f5", padding: 8, borderRadius: 4 },
};
