import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VerificarCuenta = () => {
  const [estado, setEstado] = useState("Verificando...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setEstado("Token no válido.");
      return;
    }

    fetch(`http://localhost:5173/verificar?token=${token}`, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          setEstado("✅ Tu cuenta fue verificada con éxito. Ya podés iniciar sesión.");
        } else {
          setEstado("❌ Token inválido o expirado.");
        }
      })
      .catch(() => setEstado("❌ Error al verificar el token."));
  }, []);

  return (
    <div className=" mt-[150px] text-center p-4">
      <h1 className="text-2xl font-semibold text-azul">{estado}</h1>

      <p className="text-gray-600 mt-4">
        Si tu cuenta fue verificada, podés iniciar sesión en el siguiente enlace:  
        <Link to="/" className="text-azul font-semibold ml-2">
           Iniciar sesión
        </Link>
      </p>   
    </div>
  );
};

export default VerificarCuenta;
