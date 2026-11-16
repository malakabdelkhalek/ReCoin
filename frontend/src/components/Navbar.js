import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>ReCoin ♻️</Link>
      <div style={styles.links}>
        {user ? (
          <>
            <Link to="/profile" style={styles.link}>{user.username}</Link>
            {user.role === "citizen" && (
              <>
                <Link to="/declare" style={styles.link}>Declare Waste</Link>
                <Link to="/map" style={styles.link}>Map</Link>
              </>
            )}
            {user.role === "admin" && (
              <Link to="/admin/pending" style={styles.link}>Pending Accounts</Link>
            )}
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#2e7d32",
    color: "white",
  },
  brand: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  links: { display: "flex", gap: "16px", alignItems: "center" },
  link: { color: "white", textDecoration: "none" },
  button: {
    background: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "4px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
