import { Link } from "react-router-dom";

import useTareas from "../hooks/useTareas";
import Tarea from "../types/tareas.types";

function TareaCard({ id_Tarea, titulo_Tarea, descripcion_Tarea }: Tarea) {
  const { borrarTareas } = useTareas();
  
  return (
    <div className="m-2">
      <div className="card card-compact max-sm:container md:container bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{ titulo_Tarea }</h2>
          <p>{ descripcion_Tarea }</p>
          <div className="card-actions justify-end">
            <Link to={`/tareas/${id_Tarea}`}>
              <button className="btn btn-primary">Editar</button>
            </Link>

            <button 
              className="btn btn-error" 
              onClick={() => borrarTareas(id_Tarea)}
            >Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TareaCard;