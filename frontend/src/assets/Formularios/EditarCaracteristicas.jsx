/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const EditarCaracteristicas = ({ cerrar, confirmar, datosEditar }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: ""
  });
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState(true);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (datosEditar) {
      setFormData({
        id: datosEditar.id,
        name: datosEditar.name
      });
    }
  }, [datosEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };


  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setEstado(true);
    setEnviado(false);

    const data = new FormData();
    data.append("id", formData.id);
    data.append("name", formData.name);
    try {
      const response = await fetch(`http://localhost:3000/caracteristicas`, {
        method: "PUT",
        body: data,
      });

      if (response.ok) {
        setEstado("Caracteristica actualizado con éxito");
        setEnviado(true);
        confirmar();
      } else {
        setError("Error al actualizar la Caracteristica");
        setEnviado(true);
      }
    } catch (error) {
      setError("Error en la solicitud");
      setEnviado(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col ">
        <h2 className="text-xl font-semibold mb-4">Editar Caracteristica</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-4 relative gap-4 items-center w-full justify-between  "
        >
          <div className="flex w-full justify-between items-center">
            <label className="block mb-1">ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-2/3 border px-3 py-2 rounded"
              readOnly
            />
          </div>
          <div className="flex w-full justify-between">
            <label className="block mb-1">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-2/3 border px-3 py-2 rounded"
            />
          </div>
          
        <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={cerrar}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <p
              className={
                enviado
                  ? "text-xs text-red-500 text-center absolute bottom-3 left-1/2 -translate-x-1/2"
                  : "hidden"
              }
            >
              {estado}
            </p>
          </div>
          </form>
      </div>
    </div>
  );
};

export default EditarCaracteristicas;
