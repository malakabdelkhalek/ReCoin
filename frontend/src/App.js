import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/citizen/Profile";
import DeclareWaste from "./pages/citizen/DeclareWaste";
import Map from "./pages/citizen/Map";
import PendingAccounts from "./pages/admin/PendingAccounts";
import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={
            <PrivateRoute><Profile /></PrivateRoute>
          } />
          <Route path="/declare" element={
            <PrivateRoute><DeclareWaste /></PrivateRoute>
          } />
          <Route path="/map" element={
            <PrivateRoute><Map /></PrivateRoute>
          } />
          <Route path="/admin/pending" element={
            <PrivateRoute role="admin"><PendingAccounts /></PrivateRoute>
          } />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
