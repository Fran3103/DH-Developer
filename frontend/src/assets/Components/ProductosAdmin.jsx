import {  useState } from "react";
import useFetch from "../Hooks/useFetchData";
import { FaRegTrashAlt, FaEdit, FaPlusSquare } from "react-icons/fa";
import Formulario from "../Formularios/Formulario";
import EditarForm from "../Formularios/EditarForm";
import OpcionELiminar from "../Components/OpcionELiminar";


export const ProductosAdmin = () => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editar, setEditar] = useState(false);
    const [datosEditar, setDatosEditar] = useState(null);
    const [Update, setUpdate] = useState(false);
    
    const { datos, error, loading } = useFetch(
      "http://localhost:3000/productos",
      [Update]
    );
  
    const [eliminarId, setEliminarId] = useState("");
    const [eliminarProd, setEliminarProd] = useState(false);
    const productosPorPagina = 10;
  

    // Manejo de carga y errores
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!datos) return <div>No hay datos disponibles</div>;
  


  
    // Paginación
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = datos.slice(
      indicePrimerProducto,
      indiceUltimoProducto
    );
    const totalPaginas = Math.ceil(datos.length / productosPorPagina);
  
    // Función para eliminar un producto
  
    const eliminarProducto = () => setEliminarProd(!eliminarProd);

    // Función para abrir el formulario de edición
    
    const editarForm = (prod) => {
      setEditar(true);
      setDatosEditar(prod);
    };
  
    return (
      <>
        <div className="flex gap-3 m-auto w-full justify-center  bg-azul max-w-[1240px] h-[800px]">
          
          <div className="w-full flex-[4] flex-col items-center justify-center  pt-0 pb-6 mb-12 rounded-lg p-4 ">
            <div className="flex justify-between mt-12 w-full items-center px-4">
              <h2 className="text-2xl font-semibold">Listado de Productos</h2>
              <button
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={() => setMostrarFormulario(true)}
              >
                <FaPlusSquare className="mr-2" />
                Agregar producto
              </button>
            </div>
            <div className="p-3 mt-6 rounded w-full max-w-5xl m-auto bg-white shadow ">
              <table className="w-full table-auto ">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosActuales.map((prod) => (
                    <tr key={prod.id} className="border-b">
                      <td className="px-4 py-2 max-w-9 truncate">{prod.id}</td>
                      <td className="px-4 py-2">{prod.name}</td>
                      <td className="px-4 py-2 flex justify-center items-center space-x-4 h-full w-full">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => editarForm(prod)}
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            setEliminarId(prod), setEliminarProd(!eliminarProd);
                          }}
                        >
                          <FaRegTrashAlt size={20} />
                        </button>
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
  
        {/* Modal para agregar producto */}
        {mostrarFormulario && (
          <Formulario
            cerrar={() => setMostrarFormulario(false)}
            confirmar={() => {
              setMostrarFormulario(false);
              setUpdate((prev) => !prev);
            }}
          />
        )}
  
        {/* Modal para editar producto */}
        {editar && datosEditar && (
          <EditarForm
            datosEditar={datosEditar}
            cerrar={() => setEditar(false)}
            confirmar={() => {
              setEditar(false);
              setUpdate((prev) => !prev);
            }}
          />
        )}
        {/*Modal Elimar producto*/}
        {eliminarProd && (
          <OpcionELiminar
            setUpdate={setUpdate}
            eliminarId={eliminarId}
            eliminarProd={eliminarProd}
            loading={loading}
            eliminarProducto={eliminarProducto}
          />
        )}
      </>
    );
  };


