// Formulario.js
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Formulario = ({ cerrar, confirmar }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    address: "",
    price: "",
    rating: "",
    description: "",
    quality: "",
    caracteristicas: "",
    files: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todasCaracteristicas, setTodasCaracteristicas] = useState([]);
  const [caracteristicaActuales, setCaracteristicasActuales] = useState([]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("location", formData.location);
    data.append("address", formData.address);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    data.append(
      "caracteristicas",
      JSON.stringify(caracteristicaActuales.map((c) => c.id))
    );
    data.append("quality", formData.quality);

    if (formData.description === "") {
      data.append("description", "sin descripcion");
    } else {
      data.append("description", formData.description);
    }

    if (formData.files && formData.files.length > 0) {
      for (let i = 0; i < formData.files.length; i++) {
        data.append("files", formData.files[i]);
      }
    }else {
      // Si no hay archivos, puedes agregar una entrada vacía para 'files'
      data.append("files", new Blob()); // Esto asegura que el backend reciba algo, aunque vacío
    }
    
    try {
      const response = await fetch("http://localhost:3000/productos", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        confirmar();
      } else if (response.status === 409) {
        setError("Ya existe un producto con el mismo nombre");
      } else {
        setError("Error al guardar el producto");
      }
    } catch (err) {
      setError("Error en la solicitud");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch("http://localhost:3000/caracteristicas")
      .then((resp) => resp.json())
      .then((data) => setTodasCaracteristicas(data));
  }, []);
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
    console.log(formData)
  };


  const handleQuitarCaracteristica = (id) => {
    setCaracteristicasActuales((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-5xl flex flex-col ">
        <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 p-4 relative gap-4 items-center w-full justify-between  "
        >
          <div className="flex w-full justify-between">
            <label className="block mb-1">Nombre:</label>
            <input
              type="text"
              name="name"
              required
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
              label="categoria"
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
              required
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
            <label className="block mb-1">Imágenes:</label>
            <input
              type="file"
              name="files"
              multiple
              onChange={handleChange}
              className="w-2/3"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
