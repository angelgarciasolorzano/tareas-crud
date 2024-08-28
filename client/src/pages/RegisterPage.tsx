import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { RegisterFormSchema, RegisterTypeSchema } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import reactLogo from "../assets/react.svg";

function RegisterPage() {
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ mensaje, setMensaje ] = useState<boolean>(false);
  const { 
    registrar, usuario, mensajesBackend, 
    setMensajesBackend, autenticado, actualizarLoadingNav 
  } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterTypeSchema>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const navegar = useNavigate();

  const onSubmit = handleSubmit(async (values: RegisterTypeSchema) => {
    try {
      setLoading(true);
      await registrar(values);
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
    <div className="h-[calc(100vh-70px)] flex justify-center items-center">
      <div 
        className="flex flex-col items-center w-96 content-stretch bg-base-100 min-h-[29rem] 
          shadow-xl rounded-2xl pt-4 max-sm:m-2
        "
      >
        <img src={ reactLogo } alt="logo" />
        <h2 className="card-title mt-2">Registrate</h2>

        <form onSubmit={ onSubmit } className="w-80 mt-2 flex-grow">

          <div className="mt-2">
            <label 
              className={
                `input focus-within:input-info flex items-center gap-2
                ${
                  errors.nombre_Usuario
                  ? 'input-error focus-within:input-error' 
                  : 'input-bordered'
                }`
              }
            >
              <FaUserCircle />
              <input 
                { ...register("nombre_Usuario")}
                type="text" 
                className="grow"
                placeholder="Nombre" 
              />
            </label>
            {
              errors.nombre_Usuario?.message 
              && <span className="text-red-500">{ errors.nombre_Usuario.message }</span>
            }
          </div>

          <div className="mt-4">
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

          <div className="flex justify-center mt-4 mb-4">
            <button 
              type="submit"
              className="btn btn-primary btn-wide rounded-badge hover:btn-info 
                transition-colors duration-300
              "
              disabled={ loading }
            >
              { loading 
                ? <span className="loading loading-spinner text-info"></span> 
                : "Registrarse" 
              }
            </button>
          </div>

          <div className="label">
            <span className="label-text-alt">¿Ya tienes una cuenta?</span>
            <Link to="/login" className="btn btn-link">Inicia Sesion</Link>
          </div>

        </form>
      </div>
    </div>
  )
}

export default RegisterPage;