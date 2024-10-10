import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { TareasTypeSchema, TareasFormSchema } from "../schemas/tareaSchema";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdSubtitles } from "react-icons/md";
import { motion } from "framer-motion";
import { getTareaRequest } from "../api/tareas.api";

import reactLogo from "../assets/react.svg";
import IdParams from "../types/params.type";
import useAccion from "../hooks/useAccion";

function TareaRegisterPage() {
  const { id } = useParams<IdParams>();
  const { loading, agregarTarea, editarTarea } = useAccion();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TareasTypeSchema>({
    resolver: zodResolver(TareasFormSchema),
  });
  const buttonText = id ? "Actualizar" : "Guardar";

  const cargarTarea = async (): Promise<void> => {
    if (id) {
      try {
        const { titulo_Tarea, descripcion_Tarea } = await getTareaRequest(id);
        setValue("titulo_Tarea", titulo_Tarea);
        setValue("descripcion_Tarea", descripcion_Tarea);
      } catch (error) {
        toast.error("Hubo un error al obtener la tarea");
      } 
    }
  };

  const onSubmit = handleSubmit(async (values: TareasTypeSchema): Promise<void> => { 
    return id ? await editarTarea(id, values) : await agregarTarea(values);
  });

  useEffect(() => {
    cargarTarea();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div className="card m-2 bg-base-100 w-96 shadow-xl">
          <form onSubmit={ onSubmit }>

            <div className="card-body">
              <img src={ reactLogo } alt="Logo" className="h-10" />
              <h2 className="card-title justify-center">
                { id ? "Actualizar Tarea" : "Agregar Tarea" }
              </h2>

              <div className="mt-2">
                <label 
                  className={
                    `input focus-within:input-info flex items-center gap-2
                    ${
                      errors.titulo_Tarea
                      ? 'input-error focus-within:input-error' 
                      : 'input-bordered'
                    }`
                  }
                >
                  <MdSubtitles />
                  <input 
                    { ...register("titulo_Tarea")}
                    type="text" 
                    className="grow"
                    placeholder="Titulo de la tarea" 
                  />
                </label>
                {
                  errors.titulo_Tarea?.message 
                  && <span className="text-red-500">{ errors.titulo_Tarea.message }</span>
                }
              </div>

              <div className="mt-4">
                <textarea
                  { ...register("descripcion_Tarea")}
                  placeholder="Descripcion de la tarea"
                  className={
                    `textarea focus-within:textarea-info textarea-md w-full max-w-xs
                    ${
                      errors.descripcion_Tarea
                      ? 'textarea-error focus-within:textarea-error' 
                      : 'textarea-bordered'
                    }`
                  }
                />
                {
                  errors.descripcion_Tarea?.message 
                  && <span className="text-red-500">{ errors.descripcion_Tarea.message }</span>
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
                  {loading ? (
                    <>
                      <span className="loading loading-spinner text-info ml-2"></span>
                    </>
                  ) : (
                    buttonText
                  )}
                </motion.button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default TareaRegisterPage;