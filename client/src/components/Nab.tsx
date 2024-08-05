import { Link } from "react-router-dom";

function Nab() {
  return (
    <div className="navbar bg-blue-700">
      <div className="flex-1">
        <Link 
          to="/" 
          className="
            font-bold text-white text-xl px-1 w-20 h-8 flex justify-center items-center
            rounded-md hover:bg-black hover:bg-opacity-10 transition-colors duration-150
          "
        >Inicio</Link>
      </div>

      <div className="flex-none">
        <ul className="flex px-2">
          <li 
            className=" 
              font-semibold text-white w-28 h-8 flex justify-center items-center
              rounded-md hover:bg-black hover:bg-opacity-10 transition-colors duration-150
              
            "
          ><Link to="/login">Inicia Sesion</Link> </li>
          <li 
            className="
              font-semibold text-white w-28 h-8 flex justify-center items-center
              rounded-md hover:bg-black hover:bg-opacity-10 transition-colors duration-150
            "
          ><Link to="/register">Registrarse</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Nab;