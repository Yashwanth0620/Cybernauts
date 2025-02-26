import { Navigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const PrivateRoute = ({ element }) => {
  const { role, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>
          Loading...
        </div>
      </div>
    );
  }

  return role === "admin" ? element : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
