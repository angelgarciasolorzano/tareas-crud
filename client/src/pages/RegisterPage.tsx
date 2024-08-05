import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { RegisterFormSchema, RegisterTypeSchema } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import reactLogo from "../assets/react.svg";
import useAuthLoading from "../hooks/useAuthLoading";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterTypeSchema>({
    resolver: zodResolver(RegisterFormSchema),
  });
  const { registrar } = useAuth();
  const { isLoading, setIsLoading } = useAuthLoading(false);

  const onSubmit = handleSubmit(async (values: RegisterTypeSchema) => {
    await registrar(values);
    setIsLoading(true);
  });

  return (
    <div className="h-[calc(100vh-70px)] flex justify-center items-center">
      <div className="flex flex-col items-center w-96 content-stretch bg-base-100 min-h-[29rem] shadow-xl rounded-2xl pt-4">
        <img src={ reactLogo } alt="logo" />
        <h2 className="card-title mt-2">Registrate</h2>

        <form onSubmit={ onSubmit } className="w-80 mt-2 flex-grow">

          <div className="mt-2">
            <div className="flex gap-2">
              <FaUserCircle />
              <label className="label-text">Nombre de Usuario</label>
            </div>

            <input 
              { ...register("nombre_Usuario")}
              type="text" 
              className={
                `mt-2 px-3 py-2 bg-white border shadow-sm placeholder-slate-400 focus:outline-none 
                block w-full rounded-md sm:text-sm focus:ring-1 
                ${
                  errors.nombre_Usuario 
                  ? 'border-red-500 focus:border-red-600 focus:ring-red-600' 
                  : 'border-gray-400 focus:border-sky-500 focus:ring-sky-500'
                }`
              } 
              placeholder="Ingrese su nombre" 
            />
            {
              errors.nombre_Usuario?.message && <span className="text-red-500">{ errors.nombre_Usuario.message }</span>
            }
          </div>

          <div className="mt-4">
            <div className="flex gap-2">
              <FaUser />
              <label className="label-text">Correo</label>
            </div>
            
            <input 
              { ...register("correo_Usuario")}
              type="text"
              className={
                `mt-2 px-3 py-2 bg-white border shadow-sm placeholder-slate-400 focus:outline-none 
                block w-full rounded-md sm:text-sm focus:ring-1 
                ${
                  errors.correo_Usuario 
                  ? 'border-red-500 focus:border-red-600 focus:ring-red-600' 
                  : 'border-gray-400 focus:border-sky-500 focus:ring-sky-500'
                }`
              } 
              placeholder="usuario@gmail.com" 
            />
            {
              errors.correo_Usuario?.message && <span className="text-red-500">{ errors.correo_Usuario.message }</span>
            }
          </div>

          <div className="mt-4">
            <div className="flex gap-2">
              <FaLock />
              <label className="label-text">Contraseña</label>
            </div>

            <input 
              {...register("contra_Usuario")}
              type="password" 
              className={`
                mt-2 px-3 py-2 bg-white border shadow-sm placeholder-slate-400 focus:outline-none 
                block w-full rounded-md sm:text-sm focus:ring-1 
                ${
                  errors.contra_Usuario 
                  ? 'border-red-500 focus:border-red-600 focus:ring-red-600' 
                  : 'border-gray-400 focus:border-sky-500 focus:ring-sky-500'
                }`
              } 
              placeholder="Ejemplo: Aa1234"
            />
            {
              errors.contra_Usuario?.message && <span className="text-red-500">{ errors.contra_Usuario.message }</span>
            }
          </div>

          <div className="flex justify-center mt-4 mb-4">
            <button 
              type="submit"
              className="btn btn-primary btn-wide rounded-badge hover:btn-info transition-colors duration-300"
              disabled={ isLoading }
            >
              { isLoading ? <span className="loading loading-spinner text-info"></span> : "Registrarse" }
            </button>
          </div>

          <div className="label">
            <span className="label-text-alt">¿Ya tienes una cuenta?</span>
            <Link 
              to="/login" 
              className="btn btn-link">
            Inicia Sesion</Link>
          </div>

        </form>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
    </div>
  )
}

export default RegisterPage;