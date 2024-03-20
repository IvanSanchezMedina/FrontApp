import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"

function ProtectedRoute() {
  const {user,isAuthenticated} = useAuth();

  if(!isAuthenticated) return <Navigate to="/login" replace/>
  
  // If user is authenticated show the Dashboard page else redirect them to
  return <Outlet />;
}

export default ProtectedRoute