// Formulario.js
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Formulario = ({ cerrar, confirmar }) => {
    const [formData, setFormData] = useState({
        
        name: "",
        category: "",
        location: "",
        price: "",
        rating: "",
        description:"",
        quality: "",
        files: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
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
        data.append("price", formData.price);
        data.append("rating", formData.rating);
        data.append("quality", formData.quality);
        
        if(formData.description === ""){
            data.append("description", "sin descripcion")
        }else{ data.append("description",formData.description )}

        if (formData.files) {
            for (let i = 0; i < formData.files.length; i++) {
                data.append('files', formData.files[i]);
            }
        }

        try {
            const response = await fetch('http://localhost:3000/productos', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                confirmar();
            } else if (response.status === 409) {
                setError('Ya existe un producto con el mismo nombre');
            } else {
                setError('Error al guardar el producto');
            }
        } catch (err) {
            setError('Error en la solicitud');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col ">
        <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-4 relative gap-4 items-center w-full justify-between  "
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
            <select name="category" onChange={handleChange} value={formData.category} label="categoria" className="w-2/3 border px-3 py-2 rounded">
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
            <label className="block mb-1">Descripcion:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
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
