import { deleteCategoria } from "../CategoriaService";
// eslint-disable-next-line react/prop-types
const EliminarCategoria = ({setUpdate, eliminarId, eliminarProd, loading, eliminarProducto}) => {


    let prod = {
        
        // eslint-disable-next-line react/prop-types
        "name": eliminarId.name,
        // eslint-disable-next-line react/prop-types
        "id": eliminarId.id        
    }


    const eliminar = async () => {
          try {
      await deleteCategoria(prod.id);

      setUpdate(prev => !prev);
    } catch (error) {
      console.error("Error al eliminar la característica:", error.message);
    } finally {
      eliminarProducto(); // cerrar modal siempre
    }
    };
  return (
    <div className= {eliminarProd ?"fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50  flex-col" : 'hidden' } >
        <div className="bg-slate-100 p-12 rounded-xl">
             <p>{`¿Desea eliminar el producto ${prod.name}?`}</p>
            <div className="flex justify-end space-x-2 mt-4">
                <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition" onClick={() => eliminarProducto()}>
                        Cancelar
                </button>
                <button disabled={loading} onClick={() => { eliminar(prod.id),
                    eliminarProducto()
                }} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50">
                    {loading ? "Eliminando..." : "Eliminar"}
                </button>
                    </div>
                </div>
            </div>
  )
}

export default EliminarCategoria