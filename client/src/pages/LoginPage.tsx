import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginTypeSchema, LoginFormSchema } from "../schemas/authSchema";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";
import reactLogo from "../assets/react.svg";

function LoginPage() {
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ mensaje, setMensaje ] = useState<boolean>(false);
  const { 
    login, autenticado, mensajesBackend, usuario, 
    setMensajesBackend, actualizarLoadingNav 
  } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginTypeSchema>({
    resolver: zodResolver(LoginFormSchema),
  });

  const navegar = useNavigate();

  const onSubmit = handleSubmit(async (values: LoginTypeSchema) => {
    try {
      setLoading(true);
      await login(values);
    } finally {
      setMensaje(true);
    }
  });

  useEffect(() => {
    if (autenticado && mensaje || !autenticado && mensaje) {
      const timer = setTimeout(() => {
        setLoading(false);

        if (mensajesBackend) { 
          toast.error(mensajesBackend);
          setMensajesBackend(null); 
        }
      
        if (autenticado) {
          actualizarLoadingNav(true);
          navegar("/tareas"); 
          toast.success(`Bienvenido ${usuario?.correo_Usuario}`); 
        }

        setMensaje(false);
      }, 2000);

      return () => clearTimeout(timer);
    }

    if (autenticado) { actualizarLoadingNav(true); navegar("/tareas"); }
  }, [autenticado, mensaje]);

  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center">
      <div className="card bg-base-100 w-96 shadow-xl max-sm:m-2">
        <form onSubmit={ onSubmit }>

          <div className="card-body">
            <img src={ reactLogo } alt="Logo" className="h-10" />
            <h2 className="card-title justify-center">Iniciar Sesion</h2>

            <div className="mt-2">
              <label 
                className={
                  `input focus-within:input-info flex items-center gap-2
                  ${
                    errors.correo_Usuario
                    ? 'input-error focus-within:input-error' 
                    : 'input-bordered'
                  }`
                }
              >
                <MdEmail />
                <input 
                  { ...register("correo_Usuario")}
                  type="text" 
                  className="grow"
                  placeholder="Correo electrónico" 
                />
              </label>
              {
                errors.correo_Usuario?.message 
                && <span className="text-red-500">{ errors.correo_Usuario.message }</span>
              }
            </div>

            <div className="mt-4">
              <label 
                className={
                  `input focus-within:input-info flex items-center gap-2
                  ${
                    errors.contra_Usuario
                    ? 'input-error focus-within:input-error' 
                    : 'input-bordered'
                  }`
                }
              >
                <FaLock />
                <input 
                  { ...register("contra_Usuario")}
                  type="password" 
                  className="grow"
                  placeholder="Contraseña" 
                />
              </label>
              {
                errors.contra_Usuario?.message 
                && <span className="text-red-500">{ errors.contra_Usuario.message }</span>
              }
            </div>

            <div className="card-actions justify-center p-2">
              <button 
                type="submit"
                className="btn btn-primary btn-wide rounded-badge hover:btn-info"
                disabled={ loading }
              >
                { loading 
                  ? <span className="loading loading-spinner text-info"></span> 
                  : "Iniciar Sesion" 
                }
              </button>
            </div>

            <div className="label">
              <span className="label-text-alt">¿No tienes una cuenta?</span>
              <Link to="/register" className="btn btn-link">Registrate</Link>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginPage;