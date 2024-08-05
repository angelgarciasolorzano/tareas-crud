import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function useAuthLoading (isLoadingInitial: boolean) {
  const [isLoading, setIsLoading] = useState(isLoadingInitial);
  const { isAutenticado, mensajesBackend } = useAuth();
  const navegar = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        toast.error(mensajesBackend);

        if (isAutenticado) { navegar("/tareas"); }

      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return {
    isLoading,
    setIsLoading,
  }
};

export default useAuthLoading;