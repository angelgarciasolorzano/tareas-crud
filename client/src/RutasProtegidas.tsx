import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

function RutasProtegidas() {
  const { autenticado, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-80px)] justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    ) 
  } 

  if (!loading && !autenticado) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default RutasProtegidas;