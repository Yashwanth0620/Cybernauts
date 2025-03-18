import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Unauthorized = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#D32F2F",
    }}
  >
    Unauthorized Access
  </div>
);

const PrivateRoute = ({ element }) => {
  const { role, loading } = useAuth();
  const location = useLocation();

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

  // If role is null, redirect to login
  if (!role) return <Navigate to="/admin/login" />;
  console.log(role);
  

  // If role is "admin" and trying to access "/superadmin", show Unauthorized
  if (role === "admin" && location.pathname.startsWith("/superadmin")) {
    return <p>Unauhorized</p>
  }

  return element;
};

export default PrivateRoute;
