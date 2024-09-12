import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import useTareas from "../hooks/useTareas";
import TareaCard from "../components/TareaCard";

function TareasPage() {
  const { 
    tareas, getTareas,
    mensajeSuccess, setMensajeSuccess, mensajeBackend, setMensajeBackend 
  } = useTareas();
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    const tareas = async () => {
      try {
        await getTareas();
      } finally {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
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
  }, [mensajeSuccess, mensajeBackend]);

  return (
    <>
      {
        loading ? (
          <div className="flex h-[calc(100vh-64px)] justify-center items-center">
            <div className="loading loading-spinner loading-lg" />
          </div>
        ) : tareas.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
          >
            <div className="flex h-[calc(100vh-64px)] justify-center items-center">
              <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Bienvenido</h2>
                  <p>No tiene ninguna tarea registrada, desea registrar una?</p>

                  <div className="card-actions justify-end">
                    <Link to={`/tareas-register`}>
                      <motion.button 
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.7 }}
                        className="btn btn-primary"
                      >
                        Agregar tarea
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-[calc(100vh-64px)] overflow-y-auto"> 
            <div className="grid sm:grid-cols-2 md:grid-cols-2 md:gap-2 lg:grid-cols-3">
              <AnimatePresence>
                {
                  tareas.map((tarea, index) => (
                    <TareaCard
                      key={ tarea.id_Tarea } 
                      tarea={ tarea }
                      index={ index }
                    />
                  ))
                }
              </AnimatePresence>
            </div>
          </div>
        )
      }
    </>
  )
}

export default TareasPage;