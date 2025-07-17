import { useState } from "react";
import { registerUsuario, reEnviarCorreo } from "./authService";

// eslint-disable-next-line react/prop-types
const RegisterForm = ({ cerrar, confirmar }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Confirmado, setConfirmado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    try {
      const result = await registerUsuario(data);
      if (!result.ok) {
        throw new Error("Error al registrar el usuario");
      }
      setConfirmado(true);
      
    } catch (err) {
      if (err.status == 409) {
        setError("Ya existe un Usuario con el mismo Email");
      } else {
        setError("Error al guardar el Usuario! Por favor, intente nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const reEnviarCorreoButton = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const result = await reEnviarCorreo( formData.email );
      
      if (result.ok) {
      setLoading(false);
      }
    } catch (err) {
      if (err.status === 404) {
        setError("El correo electrónico no está registrado.");
      } else if (err.status === 429) {
        setError("Se ha alcanzado el límite de reenvíos. Por favor, inténtelo más tarde.");
      } else {
        setError("Error al reenviar el correo de verificación. Por favor, intente nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col ">
        <h2 className="text-xl font-semibold mb-4">Registrar Usuario</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {!Confirmado && (
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

            <div className="flex w-full justify-between">
              <label className="block mb-1">Apellido:</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-2/3 border px-3 py-2 rounded"
              />
            </div>
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
                {loading ? "Registrando..." : "Registrar"}
              </button>
            </div>
          </form>
        )}

        {Confirmado && (
          <div className="flex flex-col p-4 relative gap-4 items-center w-full justify-between  ">
            <p>Usuario registrado exitosamente.</p>
            <p>Por favor, verifica tu correo electrónico.</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={reEnviarCorreoButton} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50">
                {loading ? "Correo enviado" : "Re enviar correo"}
              </button>
              <button onClick={confirmar} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50">cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
