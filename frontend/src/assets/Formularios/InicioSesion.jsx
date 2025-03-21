import { useState } from "react";

// eslint-disable-next-line react/prop-types
const InicioSesion = ({ cerrar, confirmar }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result.token);
        confirmar(); // Acción para cerrar el formulario y confirmar el inicio de sesión
        window.location.reload();
      } else if (response.status === 401) {
        setError("La contraseña es incorrecta");
      } else {
        setError("El Usuario no existe");
      }
    } catch (err) {
      setError("Error en la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Iniciar Sesion</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-4 relative gap-4 items-center w-full justify-between"
        >
          <div className="flex w-full justify-between">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-2/3 border px-3 py-2 rounded"
            />
          </div>
          <div className="flex w-full justify-between">
            <label className="block mb-1">Contraseña:</label>
            <input
              type="password"
              name="password"
              minLength="8"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$"
              value={formData.password}
              onChange={handleChange}
              className="w-2/3 border px-3 py-2 rounded"
              title="La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un símbolo."
              required
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
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;
