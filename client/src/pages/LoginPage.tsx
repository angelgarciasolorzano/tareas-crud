import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginTypeSchema, LoginFormSchema } from "../schemas/authSchema";

import reactLogo from "../assets/react.svg";
import useAuthLoading from "../hooks/useAuthLoading";

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginTypeSchema>({
    resolver: zodResolver(LoginFormSchema),
  });
  const { login } = useAuth();
  const { isLoading, setIsLoading } = useAuthLoading(false);

  const onSubmit = handleSubmit(async (values: LoginTypeSchema) => {
    await login(values);
    setIsLoading(true);
  });

  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <form onSubmit={ onSubmit }>

          <div className="card-body">
            <img src={ reactLogo } alt="Logo" className="h-10" />
            <h2 className="card-title justify-center">Iniciar Sesion</h2>

            <label className="form-control">
              <div className="flex p-2 gap-2">
                <FaUser />
                <span className="label-text">Usuario</span>
              </div>

              <input 
                { ...register("correo_Usuario")}
                type="text"
                className={
                  `input input-bordered focus:input-info
                  ${
                    errors.correo_Usuario? 'input-error focus:input-error' : 'input-bordered'
                  }`
                }  
                placeholder="Introduce tu correo electrónico"
              />
              {
                errors.correo_Usuario?.message && <span className="text-red-500">{ errors.correo_Usuario.message }</span>
              }
            </label>

            <label className="form-control">
              <div className="flex p-2 gap-2">
                <FaLock />
                <span className="label-text">Contraseña</span>
              </div>

              <input 
                { ...register("contra_Usuario")}
                type="password"
                className={
                  `input input-bordered focus:input-info
                  ${
                    errors.contra_Usuario? 'input-error focus:input-error' : 'input-bordered'
                  }`
                }  
                placeholder="Introduce tu contraseña" 
              />
              {
                errors.contra_Usuario?.message && <span className="text-red-500">{ errors.contra_Usuario.message }</span>
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

            <div className="label">
              <span className="label-text-alt">¿No tienes una cuenta?</span>
              <Link 
                to="/register" 
                className="btn btn-link">
              Registrate</Link>
            </div>
          </div>

        </form>
        <Toaster position="top-left" reverseOrder={true} />
      </div>
    </div>
  )
}

export default LoginPage;