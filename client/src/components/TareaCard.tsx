import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import useTareas from "../hooks/useTareas";
import Tarea from "../types/tareas.types";

interface TareaCardProps {
  tarea: Tarea;
  index: number;
};

function TareaCard({ tarea, index }: TareaCardProps) {
  const { borrarTareas } = useTareas();
  const { id_Tarea, descripcion_Tarea, titulo_Tarea } = tarea;
  const id: string = `${id_Tarea}`;

  const variables = {
    hidden: {
      opacity: 0
    },
    visible: ({ delay }: { delay: number }) => ({
      opacity: 1,
      transition: { 
        delay,
        duration: 1 
      }
    })
  };
  
  return (
    <motion.div
      custom={{ delay: (index + 1) * 0.2 }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variables}
      layoutId={id}
    >
      <div className="m-2">
        <div className="card card-compact max-sm:container md:container bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{ titulo_Tarea }</h2>
            <p>{ descripcion_Tarea }</p>
            <div className="card-actions justify-end">
              <Link to={`/tareas/${id_Tarea}`}>
                <motion.button 
                  whileHover={{ scale: 0.9 }}
                  whileTap={{ scale: 0.7 }}
                  className="btn btn-primary"
                >
                  Editar
                </motion.button>
              </Link>

              <motion.button 
                whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 0.7 }}
                className="btn btn-error" 
                onClick={() => borrarTareas(id_Tarea)}
              >
                Eliminar
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TareaCard;