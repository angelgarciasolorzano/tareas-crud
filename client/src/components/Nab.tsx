import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import useAuth from "../hooks/useAuth";
import useAccion from "../hooks/useAccion";
import Modal from "./Modal";
import toast from "react-hot-toast";

function Nab() {
  const [ loading, setLoading ] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { autenticado, usuario, loadingNav } = useAuth();
  const { cerrarSesion } = useAccion();

  const navegar = useNavigate();

  const handleClick = async () => {
    setLoading(true); 
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      cerrarSesion();
      navegar("/login");
      toast.success("Sesion cerrada");
    } catch (error) {
      toast.error("Error al cerrar la sesion");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <nav className="bg-blue-700 relative">
      <div className="flex items-center font-medium justify-between">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between">
          <Link 
            to={autenticado ? "/tareas" : "/"}
            className={`${open ? "text-black" : "text-white duration-700"}`}
          >
            {autenticado && loadingNav ? "Tareas" : "Inicio"}
          </Link>
          <div 
            className={`text-3xl md:hidden ${open ? "text-black" : "text-white"} duration-700`} 
            onClick={() => setOpen(!open)}
          >
            {open ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
        </div>
        <div className="p-4">
          <ul className="md:flex hidden items-center gap-8 [&_li]:text-white">
            {autenticado && loadingNav ? (
              <>
                <motion.h1
                  initial={{scale: 0}}
                  animate={{scale: 1}}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    delay: 0.2,
                    type: "spring"
                  }}
                  className="text-white"
                >
                  Bienvenido: { usuario?.nombre_Usuario }
                </motion.h1>
                <li>
                  <Link to="/tareas-register">Registrar Tarea</Link>
                </li>
                <li>
                  <label htmlFor="my_modal_6" className="font-semibold cursor-pointer">
                    Cerrar sesión
                  </label>
                </li>
              </>
            ): (
              <>
                <li>
                  <Link to="/login">Inicia Sesion</Link> 
                </li>
                <li>
                  <Link to="/register">Registrarse</Link>
                </li>
              </>
            )}
          </ul>

          <ul
            className={`
              md:hidden bg-white fixed top-0 left-0 w-full h-full py-24 pl-4 duration-500 z-40 
              ${open ? "translate-x-0" : "-translate-x-full"}`
            }
          >
            {autenticado && loadingNav ? (
              <>
                <motion.h1
                  initial={{scale: 0}}
                  animate={{scale: 1}}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    delay: 0.2,
                    type: "spring"
                  }}
                  className="py-7 px-3 inline-block"
                >
                  Bienvenido: { usuario?.nombre_Usuario }
                </motion.h1>
                <li>
                  <Link 
                    to="/tareas"
                    className="py-7 px-3 inline-block"
                    onClick={() => setOpen(!open)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/tareas-register"
                    className="py-7 px-3 inline-block" 
                    onClick={() => setOpen(!open)}
                  >
                    Registrar Tarea
                  </Link>
                </li>
                <li>
                  <label 
                    htmlFor="my_modal_6" 
                    className="font-semibold cursor-pointer py-7 px-3 inline-block" 
                    onClick={() => setOpen(!open)}
                  >
                    Cerrar sesión
                  </label>
                </li>
              </>
            ): (
              <>
               <li>
                  <Link 
                    to="/"
                    className="py-7 px-3 inline-block"
                    onClick={() => setOpen(!open)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/login" 
                    className="py-7 px-3 inline-block" 
                    onClick={() => setOpen(!open)}
                  >
                    Iniciar Sesion
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="py-7 px-3 inline-block" 
                    onClick={() => setOpen(!open)}
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
          <Modal handleClick={handleClick} loading={loading} />
        </div>
      </div>
    </nav>
  );
}

export default Nab;