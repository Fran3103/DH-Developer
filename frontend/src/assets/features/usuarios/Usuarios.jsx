import { useState } from "react";
import useFetch from "../../Hooks/useFetchData";
import { FaEdit, FaBan, FaCheckCircle } from "react-icons/fa";

import CambiaRol from "../../features/admin/CambiaRol";

export const Usuarios = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [editar, setEditar] = useState(true);
  const [errorRol, setErrorRol] = useState(false);
  const [rol, setRol] = useState({
    id: "",
    role: "",
    name: "",
  });

  const [cambiarRol, setCambiarRol] = useState(false);
  const [Update, setUpdate] = useState(false);

  const handleChange = (e, userId, userName) => {
    const { name, value } = e.target;
    setRol({
      id: userId,
      [name]: value,
      name: userName,
    });
  };

  const handleClick = () => {
    if (rol.role.length !== 0) {
      setCambiarRol(!cambiarRol);
    } else {
      setErrorRol(true); // Muestra el modal de error
    }
  };

  const cerrar = () => {
    setCambiarRol(false);
    setUpdate((prev) => !prev);
    setEditar(true);
    setRol({
      id: "",
      role: "",
      name: "",
    });
  };

  const { datos, error, loading } = useFetch("http://localhost:3000/usuarios", [
    Update,
  ]);

  const usuariosPorPagina = 8;

  // Manejo de carga y errores
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!datos) return <div>No hay datos disponibles</div>;

  // Paginación
  const indiceUltimousuario = paginaActual * usuariosPorPagina;
  const indicePrimerusuario = indiceUltimousuario - usuariosPorPagina;
  const usuariosActuales = datos.slice(
    indicePrimerusuario,
    indiceUltimousuario
  );
  const totalPaginas = Math.ceil(datos.length / usuariosPorPagina);

  return (
    <>
      <div className="flex gap-3 m-auto w-full justify-center">
        <div className="w-full flex-[4] flex-col items-center justify-center  pt-0 pb-6 mb-12 rounded-lg p-4 max-w-[1240px]">
          <div className="flex justify-between mt-12 w-full items-center px-4">
            <h2 className="text-2xl font-semibold">Listado de Usuarios </h2>
          </div>
          <div className="p-3 mt-6 rounded w-full max-w-5xl m-auto bg-white shadow ">
            <table className="w-full table-auto ">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Apellido</th>
                  <th className="px-4 py-2 text-center">Rol</th>
                  <th className="px-4 py-2 text-center">Accion</th>
                </tr>
              </thead>
              <tbody>
                {usuariosActuales.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-2 max-w-9 truncate">{user.id}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.lastName}</td>
                    <td className="px-4 py-2 flex justify-center items-center space-x-4 h-full w-full">
                      <select
                        name="role"
                        className={
                          editar
                            ? "w-2/3 border px-3 py-2 rounded cursor-not-allowed"
                            : "w-2/3 border px-3 py-2 rounded cursor-pointer"
                        }
                        disabled={editar}
                        onChange={(e) => handleChange(e, user.id, user.name)}
                      >
                        <option value="">
                          {user?.role === "USER" ? "Usuario" : "Administrador"}
                        </option>
                        <option value="">--Selecciona un rol--</option>
                        <option value="USER">Usuario</option>
                        <option value="ADMIN">Administrador</option>
                      </select>
                    </td>
                    <td>
                      <span className="flex justify-center items-center">
                        {editar ? (
                          <FaEdit
                            size={20}
                            onClick={() => setEditar(!editar)}
                            className=" cursor-pointer "
                            color="blue"
                          />
                        ) : (
                          <span className="flex  gap-5 cursor-pointer">
                            <FaBan size={20} color="red" onClick={cerrar} />{" "}
                            <FaCheckCircle
                              size={20}
                              color="green"
                              className="cursor-pointer"
                              onClick={handleClick}
                            />
                          </span>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Paginación */}
            <div className=" justify-center mt-4 items-center space-x-2  m-auto flex">
              <button
                onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                disabled={paginaActual === 1}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span>{`Página ${paginaActual} de ${totalPaginas}`}</span>
              <button
                onClick={() =>
                  setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
                }
                disabled={paginaActual === totalPaginas}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal de confirmacion de cambio de rol*/}
      {cambiarRol && (
        <CambiaRol
          rol={rol}
          cerrar={cerrar}
          confirmar={() => {
            setEditar(true);
            setUpdate((prev) => !prev);
            setCambiarRol(!cambiarRol);
          }}
        />
      )}

      {/* Modal de Advertencia */}
      {errorRol && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center w-full max-w-sm">
            <h2 className="text-red-600 font-bold">Error</h2>
            <p className="text-gray-700">Selecciona un rol para actualizar.</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={() => setErrorRol(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
