import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Redirects to /login if the user is not authenticated.
// Optionally restricts to a specific role.
export default function PrivateRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
}
