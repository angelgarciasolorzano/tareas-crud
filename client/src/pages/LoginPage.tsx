import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Usuario } from "../types/usuario.types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import reactLogo from "../assets/react.svg";

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<Usuario>();
  const { login, isAutenticado, mensajesBackend } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navegar = useNavigate();

  const onSubmit = handleSubmit(async (values: Usuario) => {
    setIsLoading(true);
    await login(values);
  });

  useEffect(() => {
    if (isAutenticado) {
      setTimeout(() => {
        navegar("/tareas");
        toast.success("Bienvenido");
      }, 2000);
    }
  }, [isAutenticado]);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        toast.error(mensajesBackend);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, mensajesBackend]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <form onSubmit={ onSubmit }>
          <div className="card-body">
            <img src={ reactLogo } alt="Logo" className="h-10" />
            <h2 className="card-title justify-center">Bienvenido</h2>

            <label className="form-control">
              <div className="flex p-2 gap-2">
                <FaUser />
                <span className="label-text">Usuario</span>
              </div>

              <input 
                type="text" { ...register("correo_Usuario", { required: true }) }
                className="input input-bordered"  
                placeholder="Email"
              />
              {
                errors.correo_Usuario && <span className="text-red-500">Ingresar Correo</span>
              }
            </label>

            <label className="form-control">
              <div className="flex p-2 gap-2">
                <FaLock />
                <span className="label-text">Contraseña</span>
              </div>

              <input 
                type="password"  { ...register("contra_Usuario", { required: true }) }
                className="input input-bordered" 
                placeholder="Password" 
              />
              {
                errors.contra_Usuario && <span className="text-red-500">Ingresar contraseña</span>
              }
            </label>

            <div className="card-actions justify-center p-2">
              <button 
                type="submit"
                className="btn btn-primary btn-wide rounded-badge hover:btn-info"
                disabled={ isLoading }
              >
                { isLoading ? <span className="loading loading-spinner text-info"></span> : "Iniciar Sesion" }
              </button>
            </div>
          </div>
        </form>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
    </div>
  )
}

export default LoginPage;