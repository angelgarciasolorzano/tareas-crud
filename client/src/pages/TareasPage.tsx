import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import useTareas from "../hooks/useTareas";
import TareaCard from "../components/TareaCard";

function TareasPage() {
  const { 
    tareas, getTareas, 
    mensajeSuccess, setMensajeSuccess, mensajeBackend, setMensajeBackend 
  } = useTareas();
  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(() => {
    async function tareas() {
      try {
        await getTareas();
      } finally {
        setLoading(true);
      }
    }
    tareas();

    if (mensajeSuccess) {
      toast.success(mensajeSuccess);
      setMensajeSuccess(null);
    }

    if (mensajeBackend) {
      toast.error(mensajeBackend);
      setMensajeBackend(null);
    }
  }, [mensajeSuccess, mensajeBackend, ]);

  return (
    <>
      {tareas.length === 0 && loading ? (
        <div className="flex h-[calc(100vh-64px)] justify-center items-center">
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Bienvenido</h2>
              <p>No tiene ninguna tarea registrada, desea registrar una?</p>

              <div className="card-actions justify-end">
                <Link to={`/tareas-register`}>
                  <button className="btn btn-primary">Agregar tarea</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 md:gap-2 lg:grid-cols-3">
          {
            tareas.map(tarea => (
              <TareaCard 
                key={ tarea.id_Tarea } 
                id_Tarea={ tarea.id_Tarea }
                titulo_Tarea={ tarea.titulo_Tarea } 
                descripcion_Tarea={ tarea.descripcion_Tarea } 
              />
            ))
          }
        </div>
      )}
    </>
  )
}

export default TareasPage;