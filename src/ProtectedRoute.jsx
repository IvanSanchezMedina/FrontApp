import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"

function ProtectedRoute() {
  const {loading,user,isAuthenticated} = useAuth();

  if(loading) return <h1>
    Loading ...
  </h1>

  if(!loading && !isAuthenticated) return <Navigate to="/login" replace/>
  
  // If user is authenticated show the Dashboard page else redirect them to
  return <Outlet />;
}

export default ProtectedRoute