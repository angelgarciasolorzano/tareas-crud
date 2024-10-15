import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginTypeSchema, LoginFormSchema } from "../schemas/authSchema";
import { motion } from "framer-motion";
import { useDocumentTitle } from "@uidotdev/usehooks";

import reactLogo from "../assets/react.svg";
import useAccion from "../hooks/useAccion";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

function LoginPage() {
  const navegar = useNavigate();
  const { loading, login } = useAccion();
  const { autenticado } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginTypeSchema>({
    resolver: zodResolver(LoginFormSchema),
  });

  useDocumentTitle("Tareas CRUD - Login");

  const onSubmit = handleSubmit(async (values: LoginTypeSchema) => {
    await login(values);
  });

  useEffect(() => {
    if (autenticado) navegar("/tareas");
  }, [autenticado])

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
    >
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
                <motion.button 
                  whileHover={{ scale: 0.9 }}
                  whileTap={{ scale: 0.7 }}
                  type="submit"
                  className="btn btn-primary btn-wide rounded-badge hover:btn-info"
                  disabled={ loading }
                >
                  { loading 
                    ? <span className="loading loading-spinner text-info"></span> 
                    : "Iniciar Sesion" 
                  }
                </motion.button>
              </div>

              <div className="label">
                <span className="label-text-alt">¿No tienes una cuenta?</span>
                <Link to="/register" className="btn btn-link">Registrate</Link>
              </div>
            </div>

          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default LoginPage;