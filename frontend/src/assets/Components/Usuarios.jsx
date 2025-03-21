import { useState } from "react";
import useFetch from "../Hooks/useFetchData";
import { FaEdit, FaBan, FaCheckCircle } from "react-icons/fa";
import { actualizarRol } from "../Hooks/useFetchDataEdit";

export const Usuarios = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [editar, setEditar] = useState(true);
  const [rol, setRol] = useState({
    id:"",
    role:""
  });

  const [Update, setUpdate] = useState(false);

  const handleChange = (e, userId) => {
    const { name, value } = e.target;
    setRol({
      id:userId,
      [name]:value
      
    });
  };

  const HandleSudmit = async () => {
      if (!rol.id || !rol.role){
        console.log("este es el id:", {rol}  )
        alert("Selecciona un Rol para actualizar")
        return
      }

      await actualizarRol(rol.id, rol.role)
      setUpdate(!Update)
      setEditar(true)
    
  }
 
 

   


  const { datos, error, loading } = useFetch("http://localhost:3000/usuarios", [
    Update,
  ]);

  const usuariosPorPagina = 10;
  




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
      <div className="flex gap-3 m-auto w-full justify-center  bg-azul max-w-[1240px] h-[800px]">
        <div className="w-full flex-[4] flex-col items-center justify-center  pt-0 pb-6 mb-12 rounded-lg p-4 ">
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
                        className={editar ? "w-2/3 border px-3 py-2 rounded cursor-not-allowed" : "w-2/3 border px-3 py-2 rounded cursor-pointer"}
                        disabled={editar}
                        onChange={(e)=>handleChange(e, user.id)}
                      >
                        <option value="">
                          {user?.role === "USER" ? "Usuario" : "Administrador"}
                        </option>
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
                            <FaBan
                              size={20}
                              color="red"
                              onClick={() => setEditar(true)}
                            />{" "}
                            <FaCheckCircle
                              size={20}
                              color="green"
                              className="cursor-pointer"
                              onClick={HandleSudmit}
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
    </>
  );
};
