import { motion } from "framer-motion";
import { useRef } from "react";

interface Props {
  handleClick: () => Promise<void>;
  loading: boolean;
};

function Modal({ handleClick, loading }: Props) {
  const modalCheckboxRef = useRef<HTMLInputElement>(null);

  const handleAcceptClick = async (): Promise<void> => {
    await handleClick(); 
    if (modalCheckboxRef.current) {
      modalCheckboxRef.current.checked = false; 
    }
  };

  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" ref={modalCheckboxRef} />
      <div className="modal" role="dialog">
        <div className="modal-box text-black">
          <h3 className="text-lg font-bold">Advertencia!</h3>
          <p className="py-4">¿Desea cerrar la sesión?</p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">Cancelar</label>
            <motion.button 
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 0.6 }}
              className="btn btn-primary" 
              onClick={handleAcceptClick}
              disabled={loading}
            >
              {loading 
                ? <span className="loading loading-spinner text-info"></span> 
                : "Aceptar"
              }
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;