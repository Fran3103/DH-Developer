/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { updateProducto } from "../productoService";

// eslint-disable-next-line react/prop-types
const EditarForm = ({ cerrar, confirmar, datosEditar }) => {

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    location: "",
    price: "",
    rating: "",
    quality: "",
    address: "",
    description: "",
    caracteristicas: "",
    files: [],
  });

  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState(true);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(null);
  const [todasCaracteristicas, setTodasCaracteristicas] = useState([]);
  const [caracteristicaActuales, setCaracteristicasActuales] = useState(
    datosEditar.caracteristicas || []
  );

  useEffect(() => {
    fetch("http://localhost:3000/caracteristicas")
      .then((resp) => resp.json())
      .then((data) => setTodasCaracteristicas(data));
  }, []);

  useEffect(() => {
    if (datosEditar?.caracteristicas) {
      setCaracteristicasActuales(datosEditar.caracteristicas);
    }
    if (datosEditar) {
      setFormData({
        id: datosEditar.id,
        name: datosEditar.name,
        category: datosEditar.category,
        location: datosEditar.location,
        address: datosEditar.address,
        price: datosEditar.price,
        rating: datosEditar.rating,
        quality: datosEditar.quality,
        description: datosEditar.description,
        caracteristicas: datosEditar.caracteristicas,
        files: [],
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

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      files: e.target.files,
    }));
  };


  const handleAgregarCaracteristica = () => {
    const nombreSeleccionado = formData.caracteristicas;
    if (!nombreSeleccionado) return;

    const caracteristicaSeleccionada = todasCaracteristicas.find(
      (c) => c.name === nombreSeleccionado
    );

    if (
      caracteristicaSeleccionada &&
      !caracteristicaActuales.some(
        (c) => c.id === caracteristicaSeleccionada.id
      )
    ) {
      setCaracteristicasActuales((prev) => [
        ...prev,
        caracteristicaSeleccionada,
      ]);

      // También actualizamos formData si lo necesitás luego para enviar
      setFormData((prev) => ({
        ...prev,
        caracteristicas: "",
      }));
    }
  };

  const handleQuitarCaracteristica = (id) => {
    setCaracteristicasActuales((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEstado(true);
    setEnviado(false);

    const data = new FormData();
    data.append("id", formData.id);
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("location", formData.location);
    data.append("address", formData.address);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("rating", formData.rating);
    data.append("quality", formData.quality);
    data.append(
      "caracteristicas",
      JSON.stringify(caracteristicaActuales.map((c) => c.id))
    );

    for (let i = 0; i < formData.files.length; i++) {
      data.append("files", formData.files[i]);
    }

    try {
      await updateProducto(data);
      setEstado("Producto actualizado con éxito");
      setEnviado(true);
      confirmar();
    } catch (err) {
      if (err.status === 404) {
        setError("El producto no fue encontrado.");
      } else {
        setError("Error al actualizar el producto");
      }
      setEnviado(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-5xl flex flex-col ">
        <h2 className="text-xl font-semibold mb-4">Editar producto</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 p-4 relative gap-4 items-center w-full justify-between  "
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
          <div className="flex w-full justify-between items-center">
            <label className="block mb-1">Categoría:</label>
            <select
              name="category"
              onChange={handleChange}
              value={formData.category}
              className="w-2/3 border px-3 py-2 rounded"
            >
              <option value="">Seleccionar Categoria</option>
              <option value="Casas">Casas</option>
              <option value="Departamentos">Departamentos</option>
              <option value="Hoteles">Hoteles</option>
            </select>
          </div>
          <div className="flex w-full justify-between">
            <label className="block mb-1">Ubicación:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-2/3 border px-3 py-2 rounded"
            />
          </div>
          <div className="flex w-full justify-between">
            <label className="block mb-1">Direccion:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-2/3 border px-3 py-2 rounded"
            />
          </div>
          <div className="flex w-full justify-between">
            <label className="block mb-1">Precio:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-2/3 border px-3 py-2 rounded"
            />
          </div>
          <div className="flex w-full justify-between">
            <label className="block mb-1">Calificación:</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-2/3 border px-3 py-2 rounded"
            />
          </div>
          <div className="flex w-full justify-between">
            <label className="block mb-1">Calidad:</label>
            <input
              type="text"
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              className="w-2/3 border px-3 py-2 rounded"
            />
          </div>
          <div className="flex w-full justify-between">
            <label className="block mb-1">Descripcion:</label>
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-2/3 border px-3 py-2 rounded min-h-40 max-h-40"
            />
          </div>
          <div className="flex flex-col w-full justify-between gap-2">
            <label className="">Características actuales:</label>{" "}
            <div className="w-full border rounded p-3 bg-gray-50 min-h-[100px]">
              {caracteristicaActuales.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {caracteristicaActuales.map((c) => (
                    <div
                      key={c.id}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center space-x-2"
                    >
                      <span>{c.name}</span>
                      <button
                        type="button"
                        onClick={() => handleQuitarCaracteristica(c.id)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No hay características agregadas.
                </p>
              )}
            </div>
            {/* Agregar nueva característica */}
            <div className="flex  items-center ">
              <select
                name="caracteristicas"
                onChange={handleChange}
                value={formData.caracteristicas}
                className="flex-1 border px-3 py-2 rounded w-3 "
              >
                <option value="">Agregar Nueva</option>
                {todasCaracteristicas
                  .filter(
                    (c) =>
                      !caracteristicaActuales.some((e) => e.name === c.name)
                  )
                  .map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAgregarCaracteristica}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Agregar
              </button>
            </div>
          </div>
          <div className="flex w-full justify-between">
            <label className="block mb-1">Imágenes:</label>
            <input
              type="file"
              name="files"
              multiple
              onChange={handleFileChange}
              className="w-2/3"
            />
          </div>

          <div className="flex justify-center space-x-2 mt-4">
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

export default EditarForm;
