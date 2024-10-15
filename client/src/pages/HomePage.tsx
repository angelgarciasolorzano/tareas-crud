import { Link, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { motion } from "framer-motion";

import "../App.css";
import useAuth from "../hooks/useAuth";
import fondo from "../fondo.jpg";

function HomePage() {
  const navegar = useNavigate();
  const { autenticado } = useAuth();

  useDocumentTitle("Tareas CRUD - Home");

  useEffect(() => {
    if (autenticado) navegar("/tareas"); 
  }, [autenticado]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="h-[calc(100vh-68px)] flex justify-center items-center">
        <div className="max-w-sm flex flex-col items-center pt-4 rounded-3xl h-96 shadow-xl bg-white max-sm:w-80">
          <img src={ fondo } alt="logo" className="h-24 w-24 rounded-full" />
          <h1 className="text-3xl font-bold text-black">Bienvenido</h1>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus voluptatum ratione eligendi 
            nam. Voluptatem impedit quos suscipit porro natus distinctio earum accusamus nihil labore deleniti 
            incidunt, nesciunt quaerat a saepe.
          </p>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 0.7 }}
              className="btn btn-primary btn-wide rounded-badge hover:btn-info mt-6 transition-colors duration-300"
            >
              Iniciar Sesion
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default HomePage;