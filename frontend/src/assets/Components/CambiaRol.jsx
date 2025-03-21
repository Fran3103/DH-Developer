import { actualizarRol } from "../Hooks/useFetchDataEdit";
import PropTypes from "prop-types";

export default function CambiaRol({rol, cerrar, confirmar}) {
  const HandleSudmit = async () => {
    await actualizarRol(rol.id, rol.role);

    confirmar();
  };


  return (
    <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col  text-center gap-4">
        <h1>
          Esta por cambiar el rol de <span className="font-bold">{rol.name}</span> a <span className="font-bold">{rol.role}</span>
        </h1>
        <h2>¿Desea continuar? </h2>
        <div className="flex justify-around items-center w-full gap-2">
        <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              onClick={cerrar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
              onClick={HandleSudmit}
            >
                Confirmar
            </button>
        </div>
      </div>
    </div>
  );
}
CambiaRol.propTypes = {
    rol: PropTypes.shape({
      id: PropTypes.number.isRequired,
      role: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    cerrar: PropTypes.func.isRequired,
    confirmar: PropTypes.func.isRequired,
  };