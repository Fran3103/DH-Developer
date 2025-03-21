import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para decodificar el token JWT
  const decodeToken = (token) => {
    if (!token || token.split(".").length < 3) {
      console.error("El token no es válido o está mal formado");
      return null;
    }

    const base64Url = token.split(".")[1]; // La parte que contiene los datos (payload)
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    try {
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload); // Devuelve los datos decodificados
    } catch (error) {
      console.error("Error al decodificar el token", error);
      return null;
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      const userData = decodeToken(savedToken); // Decodificas el token JWT
      if (userData) {
        setUser(userData); // Usas los datos del token
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData); // Almacena los datos del usuario
    localStorage.setItem("token", JSON.stringify(userData)); // Guarda el token en localStorage
  };

  const logout = () => {
    setUser(null); // Limpia el estado del usuario
    localStorage.removeItem("token"); // Elimina el token de localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout, decodeToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
