import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function Nab() {
  const [ loading, setLoading ] = useState<boolean>(false);
  const { autenticado, usuario, cerrarSesion, loadingNav } = useAuth();
  const navegar = useNavigate();

  const handleClick = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      cerrarSesion();
      setLoading(false);
      navegar('/login'); 
    }, 3000);

    return () => clearTimeout(timer);
  };

  return (
    <div className="bg-blue-700 sm:navbar">
      <div className="flex-1">
        <Link 
          to={ autenticado ? "/tareas" : "/" }
          className="
            font-bold text-white text-xl px-1 w-20 h-8 flex justify-center items-center
            rounded-md hover:bg-black hover:bg-opacity-10 transition-colors duration-150
          "
        >{ autenticado && loadingNav ? "Tareas" : "Inicio" }</Link>
      </div>

      <div className="flex-none">
        <ul className="flex px-2 flex-wrap gap-4 [&_li]:flex-grow [&_li]:text-white max-sm:flex-col">
          { autenticado && loadingNav ? (
            <>
              <li>Bienvenido: { usuario?.nombre_Usuario }</li>
              <li className="font-semibold hover:font-normal">
                <Link to="/tareas-register">Añadir Tareas</Link>
              </li>
              <li className="font-semibold hover:font-normal">
                <label htmlFor="my_modal_6" className="hover:cursor-pointer">Cerrar sesion</label>
                <input type="checkbox" id="my_modal_6" className="modal-toggle" />

                <div className="modal" role="dialog">
                  <div className="modal-box text-black">
                    <h3 className="text-lg font-bold">Advertencia!</h3>
                    <p className="py-4">Desea cerrar la sesion?</p>
                    <div className="modal-action">
                      <label htmlFor="my_modal_6" className="btn">Cancelar</label>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => handleClick() }
                        disabled={ loading }
                      >
                        { loading 
                          ? <span className="loading loading-spinner text-info"></span> 
                          : "Aceptar" 
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="font-semibold hover:font-normal">
                <Link to="/login">Inicia Sesion</Link> 
              </li>
              <li className="font-semibold hover:font-normal">
                <Link to="/register">Registrarse</Link>
              </li>
            </>
          ) }
        </ul>
      </div>
    </div>
  );
}

export default Nab;