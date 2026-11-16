import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Message passed from Register page after successful sign-up
  const message = location.state?.message;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await login(form.username, form.password);
      // Redirect based on role
      if (user.role === "admin") navigate("/admin/pending");
      else navigate("/profile");
    } catch (err) {
      setError("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Log in to ReCoin</h2>
      {message && <p style={styles.success}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="username" placeholder="Username" value={form.username}
          onChange={handleChange} required style={styles.input} />
        <input name="password" type="password" placeholder="Password" value={form.password}
          onChange={handleChange} required style={styles.input} />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
      <p>No account yet? <Link to="/register">Register</Link></p>
    </div>
  );
}

const styles = {
  container: { maxWidth: 380, margin: "60px auto", padding: "0 16px" },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: { padding: "10px", fontSize: "1rem", borderRadius: 4, border: "1px solid #ccc" },
  button: { padding: "10px", backgroundColor: "#2e7d32", color: "white", border: "none", borderRadius: 4, cursor: "pointer", fontSize: "1rem" },
  error: { color: "red", fontSize: "0.9rem" },
  success: { color: "green", fontSize: "0.9rem" },
};
