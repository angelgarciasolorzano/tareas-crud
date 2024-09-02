import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TareasTypeSchema, TareasFormSchema } from "../schemas/tareaSchema";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdSubtitles } from "react-icons/md";

import useTareas from "../hooks/useTareas";
import reactLogo from "../assets/react.svg";
import IdParams from "../types/params.type";

function TareaRegisterPage() {
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ mensaje, setMensaje ] = useState<boolean>(false);
  const { 
    agregarTarea, getTarea, editarTarea, 
    mensajeBackend, setMensajeBackend, mensajeSuccess, setMensajeSuccess 
  } = useTareas();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TareasTypeSchema>({
    resolver: zodResolver(TareasFormSchema),
  });

  const navegar = useNavigate();
  const { id } = useParams() as unknown as IdParams;
  const buttonText = id ? "Actualizar" : "Guardar";

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setLoading(false);

        if (mensajeBackend) { 
          toast.error(mensajeBackend);
          setMensajeBackend(null); 
        }

        if (mensajeSuccess) {
          navegar("/tareas");
          toast.success(mensajeSuccess);
          setMensajeSuccess(null);
        }

        setMensaje(false);
      }, 2000);

      return () => clearTimeout(timer);
    }

    async function cargarTarea() {
      if (id) {
        const respuesta = await getTarea(id) as unknown as TareasTypeSchema;
        setValue("titulo_Tarea", respuesta.titulo_Tarea);
        setValue("descripcion_Tarea", respuesta.descripcion_Tarea);
      }
    }
    cargarTarea();
  }, [mensaje]);

  const onSubmit = handleSubmit(async (values: TareasTypeSchema) => {
    if (id) {
      try {
        setLoading(true);
        await editarTarea(id, values);
      } finally {
        setMensaje(true);
      }
    } else {
      try {
        setLoading(true);
        await agregarTarea(values);
      } finally {
        setMensaje(true);
      }
    }
  });

  return (
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
              <button 
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
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default TareaRegisterPage;