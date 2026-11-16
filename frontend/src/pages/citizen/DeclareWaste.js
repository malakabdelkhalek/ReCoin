import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function DeclareWaste() {
  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({ material: "", quantity: "", photo: null });
  const [declarations, setDeclarations] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/waste/materials/").then((r) => setMaterials(r.data));
    api.get("/waste/declarations/").then((r) => setDeclarations(r.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Use FormData because we may have a file
    const data = new FormData();
    data.append("material", form.material);
    data.append("quantity", form.quantity);
    if (form.photo) data.append("photo", form.photo);

    try {
      const { data: created } = await api.post("/waste/declarations/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDeclarations([created, ...declarations]);
      setForm({ material: "", quantity: "", photo: null });
      setSuccess(true);
    } catch (err) {
      setError("Failed to submit declaration.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Declare Waste</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <select name="material" value={form.material} onChange={handleChange}
          required style={styles.input}>
          <option value="">Select material…</option>
          {materials.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} — {m.coins_per_unit} coins/{m.unit}
            </option>
          ))}
        </select>
        <input name="quantity" type="number" min="0.01" step="0.01"
          placeholder="Quantity" value={form.quantity}
          onChange={handleChange} required style={styles.input} />
        <label style={styles.fileLabel}>
          Photo (optional)
          <input type="file" accept="image/*" onChange={handlePhoto} style={{ marginTop: 4 }} />
        </label>
        {success && <p style={styles.success}>Declaration submitted! A collector will verify it.</p>}
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Submit Declaration</button>
      </form>

      <h3>My Declarations</h3>
      {declarations.length === 0 ? (
        <p>No declarations yet.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Material</th><th>Quantity</th><th>Status</th><th>Date</th>
            </tr>
          </thead>
          <tbody>
            {declarations.map((d) => (
              <tr key={d.id}>
                <td>{d.material_name}</td>
                <td>{d.quantity}</td>
                <td>{d.status}</td>
                <td>{new Date(d.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: 600, margin: "40px auto", padding: "0 16px" },
  form: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 },
  input: { padding: "10px", fontSize: "1rem", borderRadius: 4, border: "1px solid #ccc" },
  fileLabel: { display: "flex", flexDirection: "column", fontSize: "0.9rem", color: "#555" },
  button: { padding: "10px", backgroundColor: "#2e7d32", color: "white", border: "none", borderRadius: 4, cursor: "pointer", fontSize: "1rem" },
  error: { color: "red" },
  success: { color: "green" },
  table: { width: "100%", borderCollapse: "collapse" },
};
