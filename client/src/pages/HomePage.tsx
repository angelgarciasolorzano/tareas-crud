import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "../App.css";
import useAuth from "../hooks/useAuth";
import fondo from "../fondo.jpg";

function HomePage() {
  const { autenticado } = useAuth();

  const navegar = useNavigate();

  useEffect(() => {
    if (autenticado) { navegar("/tareas"); }
  }, [autenticado]);

  return (
    <div className="h-[calc(100vh-68px)] flex justify-center items-center">
      <div className="max-w-sm flex flex-col items-center pt-4 rounded-3xl h-96 shadow-xl bg-white max-sm:w-80">
        <img src={ fondo } alt="logo" className="h-24 w-24 rounded-full" />
        <h1 className="text-3xl font-bold text-black">Bienvenido</h1>
        <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus voluptatum ratione eligendi nam. Voluptatem impedit quos suscipit porro natus distinctio earum accusamus nihil labore deleniti incidunt, nesciunt quaerat a saepe.</p>
        <Link 
          to="/login"
          className="btn btn-primary btn-wide rounded-badge hover:btn-info mt-6 transition-colors duration-300">
          Inicia Sesion
        </Link>
      </div>
    </div>
  )
}

export default HomePage;